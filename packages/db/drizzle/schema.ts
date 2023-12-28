/**
 * This module defines the database schema using the Drizzle ORM for SQLite.
 * It includes table definitions, column configurations, default values, and relationships between tables.
 * The schemas are organized into two sections: "Schemas" and "Relations."
 */

import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";

/*****************************************
 ************Schemas section***********
 *****************************************
 */

/**
 * Represents the `createdAt` column configuration used for timestamping the creation date of entities.
 */
const createdAt = text("created_at")
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull();

/**
 * Represents the `updatedAt` column configuration used for timestamping the last update date of entities.
 */
export const updatedAt = text("updated_at")
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull();

/**
 * Represents the 'users' table schema with columns for user information.
 */
export const users = sqliteTable("user", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  username: text("username").unique().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),

  dob: text("dob"),

  email: text("email").unique().notNull(),
  password: text("password").notNull(),

  image: text("image"),
  gender: text("gender", { enum: ["male", "female"] }).notNull(),
  address: text("address"),

  createdAt,
  updatedAt,
});

/**
 * Represents the 'posts' table schema with columns for post information.
 */
export const posts = sqliteTable("post", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => createId()),
  content: text("content").notNull(),
  authorId: text("author_id", { length: 36 }).notNull(),

  createdAt,
  updatedAt,
});

/**
 * Represents the 'images' table schema with columns for image information.
 */
export const images = sqliteTable("images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  postId: text("post_id", { length: 36 }).notNull(),

  createdAt,
  updatedAt,
});

/**
 * Represents the 'likes' table schema with columns for like information.
 */
export const likes = sqliteTable(
  "likes",
  {
    userId: text("user_id", { length: 36 }).notNull(),
    postId: text("post_id", { length: 36 }).notNull(),

    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      pk: primaryKey({
        name: "id",
        columns: [table.userId, table.postId],
      }),
    };
  }
);

/*****************************************
 ************Relations section***********
 *****************************************
 */

/**
 * Defines relationships for the 'users' table, including associations with 'posts' and 'likes'.
 */
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts, {
    relationName: "posts",
  }),
  likes: many(likes, {
    relationName: "likes",
  }),
}));

/**
 * Defines relationships for the 'posts' table, including associations with 'images', 'author', and 'likes'.
 */
export const postsRelations = relations(posts, ({ many, one }) => ({
  images: many(images, {
    relationName: "images",
  }),
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
    relationName: "author",
  }),
  likes: many(likes, {
    relationName: "likes",
  }),
}));

/**
 * Defines relationships for the 'images' table, including an association with 'post'.
 */
export const imagesRelations = relations(images, ({ one }) => ({
  post: one(posts, {
    fields: [images.postId],
    references: [posts.id],
    relationName: "post",
  }),
}));

/**
 * Defines relationships for the 'likes' table, including associations with 'post' and 'author'.
 */
export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
    relationName: "post",
  }),
  author: one(users, {
    fields: [likes.userId],
    references: [users.id],
    relationName: "author",
  }),
}));

// model Like {
//     113   │     id Int @id @default(autoincrement())
//     114   │
//     115   │     userId String
//     116   │     user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
//     117   │
//     118   │     postId Int
//     119   │     post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
//     120   │
//     121   │     createdAt DateTime @default(now())
//     122   │     updatedAt DateTime @updatedAt
//     123   │
//     124   │     @@unique([userId, postId])
//     125   │     @@index([postId])
//     126   │ }
