import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, generatedContent, userSettings, InsertGeneratedContent, InsertUserSettings, subscriptionPlans, userSubscriptions, adminCredentials, dailyUsage, monthlyUsage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

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

    const textFields = ["name", "email", "loginMethod"] as const;
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

export async function getUserContentHistory(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(generatedContent)
    .where(eq(generatedContent.userId, userId))
    .orderBy(desc(generatedContent.createdAt))
    .limit(limit);
}

export async function saveGeneratedContent(
  userId: number,
  contentType: string,
  topic: string,
  contentLength: string,
  content: string,
  tone: string,
  language: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(generatedContent).values({
    userId,
    contentType,
    topic,
    contentLength,
    generatedContent: content,
    tone,
    language,
  });
  return result;
}

export async function getUserSettings(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(userSettings)
    .where(eq(userSettings.userId, userId))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createOrUpdateUserSettings(
  userId: number,
  settings: Partial<InsertUserSettings>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getUserSettings(userId);
  if (existing) {
    await db
      .update(userSettings)
      .set(settings)
      .where(eq(userSettings.userId, userId));
  } else {
    await db.insert(userSettings).values({
      userId,
      ...settings,
    });
  }
}

export async function deleteGeneratedContent(contentId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .delete(generatedContent)
    .where(
      and(
        eq(generatedContent.id, contentId),
        eq(generatedContent.userId, userId)
      )
    );
  return result;
}

// Admin functions
export async function getAdminByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(adminCredentials)
    .where(eq(adminCredentials.email, email))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createOrUpdateAdmin(email: string, passwordHash: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getAdminByEmail(email);
  if (existing) {
    await db
      .update(adminCredentials)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(adminCredentials.email, email));
  } else {
    await db.insert(adminCredentials).values({
      email,
      passwordHash,
      role: "super_admin",
    });
  }
}

// Subscription functions
export async function getAllSubscriptionPlans() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(subscriptionPlans);
}

export async function createSubscriptionPlan(plan: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(subscriptionPlans).values(plan);
}

export async function updateSubscriptionPlan(planId: number, updates: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(subscriptionPlans)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(subscriptionPlans.id, planId));
}

export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.userId, userId))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(users);
}

export async function getAllSubscriptions() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(userSubscriptions);
}
