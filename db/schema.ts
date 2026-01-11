import { pgTable, serial, text, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", {length: 255}).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const focusSessions = pgTable("focus_sessions", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    category: varchar("category", {length: 50}).notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time"),
    durationSeconds: integer("duration_seconds"),
    createdAt: timestamp("created_at").defaultNow()
});