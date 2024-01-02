ALTER TABLE "users" ALTER COLUMN "day_of_birth" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" char(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");