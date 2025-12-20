/**
 * ChatWidget Component
 * Real-time chat interface using Socket.io
 */

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { MessageCircle, Send, X, Minimize2, Maximize2, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface Message {
  id?: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface OnlineUser {
  id: number;
  name: string;
  role: 'user' | 'admin';
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { data: user } = trpc.auth.me.useQuery();

  // Initialize Socket.io connection
  useEffect(() => {
    if (!user || !isOpen) return;

    const newSocket = io({
      path: '/api/socket.io',
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('[Chat] Connected to server');
      setIsConnected(true);
      
      // Authenticate user
      newSocket.emit('authenticate', {
        id: user.id,
        name: user.name || 'مستخدم',
        role: user.role,
      });
    });

    newSocket.on('disconnect', () => {
      console.log('[Chat] Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('online_users', (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    newSocket.on('user_online', (data: { userId: number; userName: string }) => {
      toast.success(`${data.userName} الآن متصل`);
    });

    newSocket.on('user_offline', (data: { userId: number; userName: string }) => {
      toast.info(`${data.userName} غير متصل`);
    });

    newSocket.on('message_history', (history: Message[]) => {
      setMessages(history);
      scrollToBottom();
    });

    newSocket.on('new_message', (message: Message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
      
      // Play notification sound (optional)
      if (message.senderId !== user.id) {
        try {
          const audio = new Audio('/notification.mp3');
          audio.play().catch(() => {});
        } catch (e) {
          // Ignore audio errors
        }
      }
    });

    newSocket.on('user_typing', (data: { userId: number; userName: string; isTyping: boolean }) => {
      if (data.userId !== user.id) {
        setTypingUser(data.isTyping ? data.userName : null);
      }
    });

    newSocket.on('error', (error: { message: string }) => {
      toast.error(error.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user, isOpen]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Join conversation when conversation ID is set
  useEffect(() => {
    if (socket && conversationId) {
      socket.emit('join_conversation', conversationId);
    }
  }, [socket, conversationId]);

  // Create or get conversation
  useEffect(() => {
    if (user && isOpen && !conversationId) {
      // For demo purposes, use a fixed conversation ID
      // In production, you would create/fetch conversation from backend
      setConversationId(1);
    }
  }, [user, isOpen, conversationId]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socket || !conversationId || !user) return;

    const message: Omit<Message, 'id' | 'createdAt'> = {
      conversationId,
      senderId: user.id,
      senderName: user.name || 'مستخدم',
      message: inputMessage.trim(),
      isRead: false,
    };

    socket.emit('send_message', message);
    setInputMessage('');
    
    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.emit('typing', {
      conversationId,
      userId: user.id,
      userName: user.name || 'مستخدم',
      isTyping: false,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);

    if (!socket || !conversationId || !user) return;

    // Send typing indicator
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', {
        conversationId,
        userId: user.id,
        userName: user.name || 'مستخدم',
        isTyping: true,
      });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', {
        conversationId,
        userId: user.id,
        userName: user.name || 'مستخدم',
        isTyping: false,
      });
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 left-6 z-50 rounded-full w-16 h-16 shadow-2xl bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 left-6 z-50 w-96 shadow-2xl border-border">
          <CardHeader className="p-4 bg-accent text-accent-foreground flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5" />
              <div>
                <h3 className="font-bold">الدردشة المباشرة</h3>
                <p className="text-xs opacity-90">
                  {isConnected ? (
                    <>
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                      متصل
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-1"></span>
                      غير متصل
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 hover:bg-accent-foreground/10"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-accent-foreground/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea className="h-96 p-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>لا توجد رسائل بعد</p>
                    <p className="text-sm mt-1">ابدأ المحادثة الآن!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={msg.id || index}
                        className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.senderId === user.id
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {msg.senderId !== user.id && (
                            <p className="text-xs font-semibold mb-1 opacity-70">
                              {msg.senderName}
                            </p>
                          )}
                          <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString('ar-SA', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {typingUser && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                          <p className="text-xs font-semibold mb-1 opacity-70">{typingUser}</p>
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك..."
                    disabled={!isConnected}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || !isConnected}
                    size="icon"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {!isConnected ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
}
