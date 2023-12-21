import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2'
import { relations, sql } from "drizzle-orm";

 /*****************************************  
 ************Schemas section***********
 *****************************************
 */
  
const createdAt =  text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
export const updatedAt = text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull()

export const users = sqliteTable('user', {
    id: text('id', {length: 36}).primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),

    email: text('email').unique().notNull(),
    password: text('password').notNull(),

    image: text('image'),
    gender: text('gender', {enum: ['male' , 'female']}).notNull(),
    address: text('address'),

    createdAt,
    updatedAt
})

export const posts = sqliteTable('post', {
    id: text('id', {length: 36}).primaryKey().$defaultFn(() => createId()),
    status: text('status').notNull(),
    authorId: text('author_id', {length: 36}).notNull(),

    createdAt,
    updatedAt
})

export const images = sqliteTable('images', {
    id: integer('id').primaryKey({autoIncrement: true}),
    url: text('url').notNull(),
    postId: text('post_id', {length: 36}).notNull(),

    createdAt,
    updatedAt
})

export const likes = sqliteTable('likes', {
    userId: text('user_id', {length: 36}).notNull(),
    postId: text('post_id', {length: 36}).notNull(),

    createdAt,
    updatedAt
}, (table) => {
    return {
        pk: primaryKey({ name: 'id' , columns: [table.userId, table.postId]}),
    }
})

/*****************************************  
 ************Relations section***********
 *****************************************
 */

export const usersRelations = relations(users, ({many}) => ({
    posts: many(posts, {
        relationName: "posts"
    }),
    likes: many(likes, {
        relationName: "likes"
    })
}))

export const postsRelations = relations(posts, ({many,one}) => ({
    images: many(images, {
        relationName: "images"
    }),
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id],
        relationName: "author"
    }),
    likes: many(likes, {
        relationName: "likes"
    })
}))

export const imagesRelations = relations(images, ({one}) => ({
    post: one(posts, {
        fields: [images.postId],
        references: [posts.id],
        relationName: "post"
    })
}))

export const likesRelations = relations(likes, ({one}) => ({
    post: one(posts, {
        fields: [likes.postId],
        references: [posts.id],
        relationName: "post"
    }),
    author: one(users, {
        fields: [likes.userId],
        references: [users.id],
        relationName: "author"
    })
}))

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