import { pgTable, serial, integer, text, jsonb,uniqueIndex } from 'drizzle-orm/pg-core';


export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1),
	data: jsonb("data").notNull(),
	userId: text('user_id').notNull(),
});

export const data = pgTable("data", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  data: jsonb("data").notNull(),
});

export * from './auth.schema';
