import { index, integer, snakeCase, text } from "drizzle-orm/sqlite-core";
import { user } from "./user.ts";
import { sql } from "drizzle-orm";
import { group } from "./group.ts";

export const trip = snakeCase.table(
	"trip",
	{
		id: integer().primaryKey().notNull(),
		name: text().notNull(),
		groupId: integer()
			.notNull()
			.references(() => group.id, { onDelete: "cascade" }),
		createdAt: integer({ mode: "timestamp_ms" })
			.notNull()
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`),
		createdById: integer()
			.notNull()
			.references(() => user.id, { onDelete: "set null" })
	},
	(t) => [index("trip_groupId_idx").on(t.groupId)]
);
