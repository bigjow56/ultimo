import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const surveys = pgTable("surveys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name"), // Optional
  email: text("email"), // Optional
  trainingSchedule: text("training_schedule").notNull(), // Horário de Treino
  experienceLevel: text("experience_level").notNull(), // Nível de Experiência
  academyTime: text("academy_time").notNull(), // Tempo de Academia
  receptionService: text("reception_service").notNull(), // Recepção e Atendimento Inicial
  instructorSupport: text("instructor_support").notNull(), // Acompanhamento dos Instrutores
  trainingGuidance: text("training_guidance").notNull(), // Orientação e Personalização do Treino
  equipmentAvailability: text("equipment_availability").notNull(), // Disponibilidade de Equipamentos
  overallSatisfaction: text("overall_satisfaction").notNull(), // Satisfação Geral
  suggestions: text("suggestions"), // Comentários Adicionais
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSurveySchema = createInsertSchema(surveys, {
  trainingSchedule: z.enum([
    "manha", 
    "tarde", 
    "noite", 
    "varia-conforme-dia"
  ]),
  experienceLevel: z.enum([
    "iniciante", 
    "intermediario", 
    "avancado"
  ]),
  academyTime: z.enum([
    "menos-1-mes",
    "1-6-meses", 
    "6-meses-1-ano", 
    "mais-1-ano"
  ]),
  receptionService: z.enum([
    "excelente",
    "bom", 
    "regular", 
    "ruim"
  ]),
  instructorSupport: z.enum([
    "sempre",
    "as-vezes", 
    "raramente", 
    "nunca"
  ]),
  trainingGuidance: z.enum([
    "sim-sempre",
    "as-vezes", 
    "recebo-orientacao-nao-personalizada", 
    "nao-recebo-orientacao"
  ]),
  equipmentAvailability: z.enum([
    "sempre",
    "as-vezes", 
    "frequentemente-ocupados-defeito"
  ]),
  overallSatisfaction: z.enum([
    "muito-satisfeito",
    "satisfeito", 
    "indiferente", 
    "insatisfeito"
  ]),
  suggestions: z.string().optional(),
}).omit({
  id: true,
  submittedAt: true,
  name: true,
  email: true,
}).extend({
  name: z.string().optional(),
  email: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSurvey = z.infer<typeof insertSurveySchema>;
export type Survey = typeof surveys.$inferSelect;
