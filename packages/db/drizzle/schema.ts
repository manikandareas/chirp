import { relations, sql } from 'drizzle-orm';
import {
    bigint,
    date,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';

const createdAt = timestamp('created_at').default(sql`CURRENT_TIMESTAMP`);
const updatedAt = timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`);

export const users = pgTable('users', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),

    fullName: text('full_name').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),

    username: text('username').unique().notNull(),

    dob: date('day_of_birth').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    avatarUrl: text('avatar_url').notNull(),

    gender: text('gender', { enum: ['male', 'female'] }).notNull(),
    address: text('address').notNull(),

    createdAt,
    updatedAt,
});
export type User = typeof users.$inferSelect;

export const posts = pgTable('posts', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    content: text('content').notNull(),
    authorId: uuid('author_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    totalLikes: bigint('total_likes', { mode: 'number' }).default(0),

    createdAt,
    updatedAt,
});
export type Post = typeof posts.$inferSelect;

export const images = pgTable('images', {
    id: serial('id').primaryKey(),
    key: text('key').notNull(),
    url: text('url').notNull(),
    postId: uuid('post_id')
        .notNull()
        .references(() => posts.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
});
export type PostImage = typeof images.$inferSelect;

export const likes = pgTable(
    'likes',
    {
        postId: uuid('post_id')
            .notNull()
            .references(() => posts.id, { onDelete: 'cascade' }),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        createdAt,
    },
    (table) => {
        return {
            pk: primaryKey({
                name: 'id',
                columns: [table.postId, table.userId],
            }),
        };
        // eslint-disable-next-line prettier/prettier
    },
);
export type Like = typeof likes.$inferSelect;

export const comments: any = pgTable('comments', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    message: text('message').notNull(),
    authorId: uuid('author_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    postId: uuid('post_id')
        .notNull()
        .references(() => posts.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
    parentId: uuid('parent_id').references(() => comments.id, {
        onDelete: 'cascade',
    }),
});
export type Comment = typeof comments.$inferSelect;

// ---------------------------------------------------------------------//

/*
 * Relations section starts here
 */

// Relations for users
export const usersRelations = relations(users, ({ many }) => ({
    posts: many(posts),
    likes: many(likes),
    comments: many(comments),
}));

// Relations for posts
export const postsRelations = relations(posts, ({ one, many }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id],
    }),
    images: many(images),
    likes: many(likes),
    comments: many(comments),
}));

// Relations for images
export const imagesRelations = relations(images, ({ one }) => ({
    post: one(posts, {
        fields: [images.postId],
        references: [posts.id],
    }),
}));

// Relations for likes
export const likesRelations = relations(likes, ({ one }) => ({
    post: one(posts, {
        fields: [likes.postId],
        references: [posts.id],
    }),
    author: one(users, {
        fields: [likes.userId],
        references: [users.id],
    }),
}));

// Relations for comments
export const commentsRelations = relations(comments, ({ one, many }) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id],
    }),
    author: one(users, {
        fields: [comments.authorId],
        references: [users.id],
    }),
    parent: one(comments, {
        relationName: 'ParentChild',
        fields: [comments.parentId],
        references: [comments.id],
    }),
    replies: many(comments, {
        relationName: 'ParentChild',
    }),
}));
