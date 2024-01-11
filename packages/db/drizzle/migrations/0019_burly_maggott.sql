ALTER TABLE "likes" DROP CONSTRAINT id;
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT id PRIMARY KEY(post_id,user_id);