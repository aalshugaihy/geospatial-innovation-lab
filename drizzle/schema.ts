import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  phone: varchar("phone", { length: 20 }),
  organization: text("organization"),
  jobTitle: text("jobTitle"),
  bio: text("bio"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Applications table - tracks user applications to various initiatives
 */
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  initiativeType: mysqlEnum("initiativeType", [
    "incubator",
    "accelerator",
    "hackathon",
    "bootcamp",
    "geosandbox"
  ]).notNull(),
  projectName: text("projectName").notNull(),
  projectDescription: text("projectDescription").notNull(),
  teamSize: int("teamSize"),
  expectedDuration: varchar("expectedDuration", { length: 50 }),
  status: mysqlEnum("status", [
    "draft",
    "submitted",
    "under_review",
    "accepted",
    "rejected",
    "in_progress",
    "completed",
    "withdrawn"
  ]).default("draft").notNull(),
  submittedAt: timestamp("submittedAt"),
  reviewedAt: timestamp("reviewedAt"),
  reviewNotes: text("reviewNotes"),
  startDate: date("startDate"),
  endDate: date("endDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

/**
 * Mentoring Sessions table - for scheduling and tracking mentoring sessions
 */
export const mentoringSessions = mysqlTable("mentoringSessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  applicationId: int("applicationId"),
  mentorName: text("mentorName").notNull(),
  mentorEmail: varchar("mentorEmail", { length: 320 }),
  sessionType: mysqlEnum("sessionType", [
    "consultation",
    "technical_review",
    "business_strategy",
    "pitch_practice",
    "general_guidance"
  ]).notNull(),
  scheduledAt: timestamp("scheduledAt").notNull(),
  duration: int("duration").notNull(), // in minutes
  location: text("location"), // physical location or meeting link
  status: mysqlEnum("status", [
    "scheduled",
    "confirmed",
    "completed",
    "cancelled",
    "rescheduled"
  ]).default("scheduled").notNull(),
  notes: text("notes"),
  feedback: text("feedback"),
  rating: int("rating"), // 1-5 rating
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MentoringSession = typeof mentoringSessions.$inferSelect;
export type InsertMentoringSession = typeof mentoringSessions.$inferInsert;

/**
 * Events table - for managing events and registrations
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventType: mysqlEnum("eventType", [
    "hackathon",
    "workshop",
    "bootcamp",
    "networking",
    "demo_day",
    "conference"
  ]).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  location: text("location").notNull(),
  capacity: int("capacity"),
  registrationDeadline: timestamp("registrationDeadline"),
  status: mysqlEnum("status", [
    "upcoming",
    "ongoing",
    "completed",
    "cancelled"
  ]).default("upcoming").notNull(),
  imageUrl: text("imageUrl"),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * Event Registrations table - tracks user registrations for events
 */
export const eventRegistrations = mysqlTable("eventRegistrations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  eventId: int("eventId").notNull(),
  status: mysqlEnum("status", [
    "registered",
    "confirmed",
    "attended",
    "cancelled"
  ]).default("registered").notNull(),
  registeredAt: timestamp("registeredAt").defaultNow().notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type InsertEventRegistration = typeof eventRegistrations.$inferInsert;

/**
 * Resources table - for educational resources and materials
 */
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  resourceType: mysqlEnum("resourceType", [
    "document",
    "video",
    "link",
    "tool",
    "template"
  ]).notNull(),
  category: varchar("category", { length: 100 }),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  isPublic: boolean("isPublic").default(true).notNull(),
  downloadCount: int("downloadCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

/**
 * Chat Conversations table - for managing chat conversations
 */
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mentorId: int("mentorId"),
  applicationId: int("applicationId"),
  title: text("title"),
  status: mysqlEnum("status", ["active", "archived"]).default("active").notNull(),
  lastMessageAt: timestamp("lastMessageAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

/**
 * Chat Messages table - for storing chat messages
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  senderId: int("senderId").notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Project Tracking table - for Kanban board
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("applicationId").notNull(),
  userId: int("userId").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  stage: mysqlEnum("stage", ["idea", "development", "testing", "launch"]).default("idea").notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high"]).default("medium").notNull(),
  progress: int("progress").default(0), // 0-100
  dueDate: date("dueDate"),
  tags: text("tags"), // JSON array of tags
  assignedTo: int("assignedTo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Resource Ratings table - for rating resources
 */
export const resourceRatings = mysqlTable("resourceRatings", {
  id: int("id").autoincrement().primaryKey(),
  resourceId: int("resourceId").notNull(),
  userId: int("userId").notNull(),
  rating: int("rating").notNull(), // 1-5
  review: text("review"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ResourceRating = typeof resourceRatings.$inferSelect;
export type InsertResourceRating = typeof resourceRatings.$inferInsert;

/**
 * Project Comments table - for commenting on projects
 */
export const projectComments = mysqlTable("projectComments", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  userId: int("userId").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProjectComment = typeof projectComments.$inferSelect;
export type InsertProjectComment = typeof projectComments.$inferInsert;

/**
 * User Bookmarks table - for saving favorite resources
 */
export const userBookmarks = mysqlTable("userBookmarks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  resourceId: int("resourceId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserBookmark = typeof userBookmarks.$inferSelect;
export type InsertUserBookmark = typeof userBookmarks.$inferInsert;

/**
 * Achievements table - for gamification badges and achievements
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'first_project', 'ten_ratings', 'resource_contributor', etc.
  title: text("title").notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }), // Icon name or emoji
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;