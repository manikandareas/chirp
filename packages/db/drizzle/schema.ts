import { relations, sql } from 'drizzle-orm';
import {
    date,
    pgTable,
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
    bio: text('bio'),

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

export const usersRelations = relations(users, ({ many }) => ({
    posts: many(posts),
}));

export const posts = pgTable('posts', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    content: text('content').notNull(),
    authorId: uuid('author_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),

    createdAt,
    updatedAt,
});

export type Post = typeof posts.$inferSelect;

export const postsRelations = relations(posts, ({ one, many }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id],
    }),
    images: many(images),
}));

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

export const imagesRelations = relations(images, ({ one }) => ({
    post: one(posts, {
        fields: [images.postId],
        references: [posts.id],
    }),
}));
