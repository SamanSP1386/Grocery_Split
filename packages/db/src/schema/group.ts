import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./user.ts";
import { sql } from "drizzle-orm";

export const group = sqliteTable("group", {
	id: integer().primaryKey().notNull(),
	owner: integer()
		.notNull()
		.references(() => user.id, { onDelete: "restrict" }),
	name: text().notNull()
});

export const membership = sqliteTable(
	"membership",
	{
		userId: integer()
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		groupId: integer()
			.notNull()
			.references(() => group.id, { onDelete: "cascade" }),
		since: integer({ mode: "timestamp_ms" })
			.notNull()
			.default(sql`(unixepoch('subsecond') * 1000)`)
	},
	(t) => [
		primaryKey({ columns: [t.userId, t.groupId] }),
		index("membership_userId_idx").on(t.userId),
		index("membership_groupId_idx").on(t.groupId)
	]
);

export const invite = sqliteTable(
	"invite",
	{
		code: text().notNull().primaryKey(),
		groupId: integer()
			.notNull()
			.references(() => group.id, { onDelete: "cascade" }),
		expires: integer({ mode: "timestamp_ms" }).notNull(),
		createdAt: integer({ mode: "timestamp_ms" })
			.notNull()
			.default(sql`(unixepoch('subsecond') * 1000)`),
		createdBy: integer()
			.notNull()
			.references(() => user.id, { onDelete: "cascade" })
	},
	(t) => [index("invite_groupId_idx").on(t.groupId)]
);
