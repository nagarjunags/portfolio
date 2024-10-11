import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  user: varchar("user", { length: 255 }),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});
