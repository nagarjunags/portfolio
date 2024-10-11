CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" varchar(255),
	"content" text,
	"created_at" timestamp DEFAULT now()
);
