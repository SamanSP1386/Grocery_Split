import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./user.ts";
import { sql } from "drizzle-orm";
import { group } from "./group.ts";

export const trip = sqliteTable("trip", {
	id: integer().primaryKey().notNull(),
	name: text().notNull(),
	groupId: integer()
		.notNull()
		.references(() => group.id, { onDelete: "cascade" }),
	createdAt: integer({ mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch('subsecond') * 1000)`),
	createdBy: integer()
		.notNull()
		.references(() => user.id, { onDelete: "set null" })
});
