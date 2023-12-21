CREATE TABLE `images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`post_id` text(36) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`user_id` text(36) NOT NULL,
	`post_id` text(36) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`post_id`, `user_id`)
);
--> statement-breakpoint
CREATE TABLE `post` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`author_id` text(36) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE user ADD `first_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE user ADD `last_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE user ADD `image` text;--> statement-breakpoint
ALTER TABLE user ADD `gender` text NOT NULL;--> statement-breakpoint
ALTER TABLE user ADD `address` text;--> statement-breakpoint
ALTER TABLE user ADD `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE user ADD `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL;