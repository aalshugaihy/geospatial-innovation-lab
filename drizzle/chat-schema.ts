import { mysqlTable, int, varchar, text, timestamp, boolean, index } from "drizzle-orm/mysql-core";
import { users } from "./schema";

/**
 * Chat Conversations Table
 * Represents a conversation between a user and a mentor
 */
export const conversations = mysqlTable("conversations", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  mentorId: int("mentor_id").notNull().references(() => users.id),
  status: varchar("status", { length: 20 }).notNull().default("active"), // active, archived, closed
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdx: index("user_idx").on(table.userId),
  mentorIdx: index("mentor_idx").on(table.mentorId),
  statusIdx: index("status_idx").on(table.status),
}));

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

/**
 * Chat Messages Table
 * Stores individual messages in conversations
 */
export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  conversationId: int("conversation_id").notNull().references(() => conversations.id),
  senderId: int("sender_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  messageType: varchar("message_type", { length: 20 }).notNull().default("text"), // text, file, image
  fileUrl: varchar("file_url", { length: 500 }),
  fileName: varchar("file_name", { length: 255 }),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  conversationIdx: index("conversation_idx").on(table.conversationId),
  senderIdx: index("sender_idx").on(table.senderId),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
}));

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * User Online Status Table
 * Tracks which users are currently online
 */
export const userOnlineStatus = mysqlTable("user_online_status", {
  userId: int("user_id").primaryKey().references(() => users.id),
  isOnline: boolean("is_online").notNull().default(false),
  lastSeen: timestamp("last_seen").defaultNow().notNull(),
  socketId: varchar("socket_id", { length: 100 }),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type UserOnlineStatus = typeof userOnlineStatus.$inferSelect;
export type InsertUserOnlineStatus = typeof userOnlineStatus.$inferInsert;

/**
 * Typing Indicators Table
 * Tracks who is currently typing in a conversation
 */
export const typingIndicators = mysqlTable("typing_indicators", {
  id: int("id").primaryKey().autoincrement(),
  conversationId: int("conversation_id").notNull().references(() => conversations.id),
  userId: int("user_id").notNull().references(() => users.id),
  isTyping: boolean("is_typing").notNull().default(false),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  conversationUserIdx: index("conversation_user_idx").on(table.conversationId, table.userId),
}));

export type TypingIndicator = typeof typingIndicators.$inferSelect;
export type InsertTypingIndicator = typeof typingIndicators.$inferInsert;
