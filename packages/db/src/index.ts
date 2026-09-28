// "schema" includes all database objects, including tables and relations.
// This is want you want to provide to drizzle orm
export * as schema from "./schema/index.ts";

// "table" only exports the tables themselves, which is more useful for querying
import { user, group, membership, invite, trip, item, wantedItem } from "./schema/index.ts";
export const table = { user, group, membership, invite, trip, item, wantedItem };
