import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("users", {
	id: integer().primaryKey().notNull(),
	email: text().notNull(),
	name: text().notNull(),
	pictureUrl: text()
});
