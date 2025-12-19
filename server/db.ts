import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  applications, 
  InsertApplication,
  mentoringSessions,
  InsertMentoringSession,
  events,
  InsertEvent,
  eventRegistrations,
  InsertEventRegistration,
  resources,
  InsertResource
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "phone", "organization", "jobTitle", "bio"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Application queries
export async function getUserApplications(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(applications)
    .where(eq(applications.userId, userId))
    .orderBy(desc(applications.createdAt));
}

export async function createApplication(application: InsertApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(applications).values(application);
  return result;
}

export async function updateApplication(id: number, userId: number, data: Partial<InsertApplication>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(applications)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(applications.id, id), eq(applications.userId, userId)));
}

export async function getApplicationById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(applications)
    .where(and(eq(applications.id, id), eq(applications.userId, userId)))
    .limit(1);
    
  return result.length > 0 ? result[0] : undefined;
}

// Mentoring session queries
export async function getUserMentoringSessions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(mentoringSessions)
    .where(eq(mentoringSessions.userId, userId))
    .orderBy(desc(mentoringSessions.scheduledAt));
}

export async function createMentoringSession(session: InsertMentoringSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(mentoringSessions).values(session);
  return result;
}

export async function updateMentoringSession(id: number, userId: number, data: Partial<InsertMentoringSession>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(mentoringSessions)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(mentoringSessions.id, id), eq(mentoringSessions.userId, userId)));
}

// Event queries
export async function getPublishedEvents() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(events)
    .where(eq(events.isPublished, true))
    .orderBy(desc(events.startDate));
}

export async function getUserEventRegistrations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(eventRegistrations)
    .where(eq(eventRegistrations.userId, userId))
    .orderBy(desc(eventRegistrations.registeredAt));
}

export async function createEventRegistration(registration: InsertEventRegistration) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(eventRegistrations).values(registration);
  return result;
}

// Resource queries
export async function getPublicResources() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(resources)
    .where(eq(resources.isPublic, true))
    .orderBy(desc(resources.createdAt));
}

// Admin queries
export async function getAllApplications() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));
}

export async function updateApplicationStatus(
  id: number, 
  status: string, 
  reviewNotes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(applications)
    .set({ 
      status: status as any,
      reviewedAt: new Date(),
      reviewNotes,
      updatedAt: new Date()
    })
    .where(eq(applications.id, id));
}
