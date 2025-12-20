/**
 * Socket.io Chat Server
 * Real-time messaging system for user-mentor communication
 */

import { Server as SocketIOServer } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import { getDb } from './db';
import { conversations, messages } from '../drizzle/schema';
import { eq, desc, and } from 'drizzle-orm';

interface SocketUser {
  id: number;
  name: string;
  role: 'user' | 'admin';
}

interface ChatMessage {
  id?: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface TypingData {
  conversationId: number;
  userId: number;
  userName: string;
  isTyping: boolean;
}

// Store active socket connections
const userSockets = new Map<number, string>(); // userId -> socketId
const socketUsers = new Map<string, SocketUser>(); // socketId -> user

export function setupChatSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    path: '/api/socket.io',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: any) => {
    console.log('[Chat] Client connected:', socket.id);

    // Handle user authentication
    socket.on('authenticate', async (userData: SocketUser) => {
      socketUsers.set(socket.id, userData);
      userSockets.set(userData.id, socket.id);
      
      console.log(`[Chat] User authenticated: ${userData.name} (ID: ${userData.id})`);
      
      // Notify user is online
      socket.broadcast.emit('user_online', {
        userId: userData.id,
        userName: userData.name,
      });
      
      // Send list of online users
      const onlineUsers = Array.from(socketUsers.values()).map(u => ({
        id: u.id,
        name: u.name,
        role: u.role,
      }));
      socket.emit('online_users', onlineUsers);
    });

    // Join a conversation room
    socket.on('join_conversation', async (conversationId: number) => {
      const user = socketUsers.get(socket.id);
      if (!user) {
        socket.emit('error', { message: 'Not authenticated' });
        return;
      }

      socket.join(`conversation_${conversationId}`);
      console.log(`[Chat] User ${user.name} joined conversation ${conversationId}`);
      
      // Load message history
      const db = await getDb();
      if (db) {
        const messageHistory = await db
          .select()
          .from(messages)
          .where(eq(messages.conversationId, conversationId))
          .orderBy(desc(messages.createdAt))
          .limit(50);
        
        socket.emit('message_history', messageHistory.reverse());
      }
    });

    // Leave a conversation room
    socket.on('leave_conversation', (conversationId: number) => {
      socket.leave(`conversation_${conversationId}`);
      const user = socketUsers.get(socket.id);
      console.log(`[Chat] User ${user?.name} left conversation ${conversationId}`);
    });

    // Send a message
    socket.on('send_message', async (data: Omit<ChatMessage, 'id' | 'createdAt'>) => {
      const user = socketUsers.get(socket.id);
      if (!user) {
        socket.emit('error', { message: 'Not authenticated' });
        return;
      }

      const db = await getDb();
      if (!db) {
        socket.emit('error', { message: 'Database not available' });
        return;
      }

      try {
        // Save message to database
        const result = await db.insert(messages).values({
          conversationId: data.conversationId,
          senderId: data.senderId,
          message: data.message,
          isRead: false,
        });

        const messageId = Number(result[0].insertId);
        
        // Update conversation last message time
        await db
          .update(conversations)
          .set({ lastMessageAt: new Date() })
          .where(eq(conversations.id, data.conversationId));

        // Prepare message with full data
        const fullMessage: ChatMessage = {
          id: messageId,
          conversationId: data.conversationId,
          senderId: data.senderId,
          senderName: data.senderName,
          message: data.message,
          isRead: false,
          createdAt: new Date(),
        };

        // Broadcast to all users in the conversation
        io.to(`conversation_${data.conversationId}`).emit('new_message', fullMessage);
        
        console.log(`[Chat] Message sent in conversation ${data.conversationId} by ${user.name}`);
      } catch (error) {
        console.error('[Chat] Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('typing', (data: TypingData) => {
      socket.to(`conversation_${data.conversationId}`).emit('user_typing', {
        conversationId: data.conversationId,
        userId: data.userId,
        userName: data.userName,
        isTyping: data.isTyping,
      });
    });

    // Mark messages as read
    socket.on('mark_as_read', async (data: { conversationId: number; messageIds: number[] }) => {
      const db = await getDb();
      if (!db) return;

      try {
        for (const messageId of data.messageIds) {
          await db
            .update(messages)
            .set({ isRead: true })
            .where(eq(messages.id, messageId));
        }
        
        // Notify other users in conversation
        socket.to(`conversation_${data.conversationId}`).emit('messages_read', {
          conversationId: data.conversationId,
          messageIds: data.messageIds,
        });
      } catch (error) {
        console.error('[Chat] Error marking messages as read:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      const user = socketUsers.get(socket.id);
      if (user) {
        userSockets.delete(user.id);
        socketUsers.delete(socket.id);
        
        // Notify others user is offline
        socket.broadcast.emit('user_offline', {
          userId: user.id,
          userName: user.name,
        });
        
        console.log(`[Chat] User ${user.name} disconnected`);
      } else {
        console.log('[Chat] Client disconnected:', socket.id);
      }
    });
  });

  console.log('[Chat] Socket.io server initialized');
  return io;
}
