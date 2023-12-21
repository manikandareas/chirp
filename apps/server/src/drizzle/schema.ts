import { randomUUID } from "crypto";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable('user', {
    id: text('id', {length: 36}).primaryKey().$defaultFn(()=> randomUUID()),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull()
})