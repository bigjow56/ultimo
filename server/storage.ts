import { type User, type InsertUser, type Survey, type InsertSurvey } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, surveys } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  insertSurvey(survey: InsertSurvey): Promise<Survey>;
  getAllSurveys(): Promise<Survey[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private surveys: Map<string, Survey>;

  constructor() {
    this.users = new Map();
    this.surveys = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async insertSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const id = randomUUID();
    const submittedAt = new Date();
    const survey: Survey = { 
      ...insertSurvey, 
      id, 
      submittedAt,
      name: insertSurvey.name || null,
      email: insertSurvey.email || null,
      suggestions: insertSurvey.suggestions || null
    };
    this.surveys.set(id, survey);
    return survey;
  }

  async getAllSurveys(): Promise<Survey[]> {
    return Array.from(this.surveys.values()).sort(
      (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
    );
  }
}

// Database storage implementation using PostgreSQL
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async insertSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const [survey] = await db
      .insert(surveys)
      .values(insertSurvey)
      .returning();
    return survey;
  }

  async getAllSurveys(): Promise<Survey[]> {
    return await db.select().from(surveys).orderBy(desc(surveys.submittedAt));
  }
}

// Use database storage instead of memory storage
export const storage = new DatabaseStorage();
