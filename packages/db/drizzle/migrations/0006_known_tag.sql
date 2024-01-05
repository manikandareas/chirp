ALTER TABLE "users" ADD COLUMN "username" char(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");