import type { ID } from "./id.ts";
import type { Group } from "./group.ts";
import type { Trip } from "./trip.ts";
import type { User } from "./user.ts";

export interface Item {
	id: ID;
	groupId: Group["id"];
	tripId: Trip["id"] | null;
	name: string;
	quantity: string | null;
	notes: string | null;
	price: number | null;
	createdAt: Date;
	createdById: User["id"];
}

export interface WantedItem {
	itemId: Item["id"];
	userId: User["id"];
	parts: number;
}
