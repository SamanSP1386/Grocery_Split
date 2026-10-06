import { index, integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./user.ts";
import { group } from "./group.ts";
import { trip } from "./trip.ts";
import { sql } from "drizzle-orm";

export const item = sqliteTable(
	"item",
	{
		id: integer().primaryKey().notNull(),
		groupId: integer()
			.notNull()
			.references(() => group.id, { onDelete: "cascade" }),
		tripId: integer() // CAN BE NULL if the item is not yet assigned to a trip
			.references(() => trip.id, { onDelete: "cascade" }),
		name: text().notNull(),
		quantity: text(),
		notes: text(),
		price: real(), // CAN BE NULL if the price is not known yet
		createdAt: integer({ mode: "timestamp_ms" })
			.notNull()
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`),
		createdById: integer()
			.notNull()
			.references(() => user.id, { onDelete: "set null" })
	},
	(t) => [index("item_groupId_tripId_idx").on(t.groupId, t.tripId)]
);

export const wantedItem = sqliteTable(
	"wantedItem",
	{
		itemId: integer()
			.notNull()
			.references(() => group.id, { onDelete: "cascade" }),
		userId: integer()
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		parts: integer().notNull()
	},
	(t) => [
		primaryKey({ columns: [t.itemId, t.userId] }),
		index("wantedItem_itemId_idx").on(t.itemId),
		index("wantedItem_userId_idx").on(t.userId)
	]
);
