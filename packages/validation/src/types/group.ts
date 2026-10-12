import type { User } from "./user.ts";
import type { ID } from "./id.ts";

export interface Group {
	id: ID;
	ownerId: User["id"];
	name: string;
}

export interface Membership {
	userId: User["id"];
	groupId: Group["id"];
	createdAt: Date;
}

export interface Invite {
	code: string;
	groupId: Group["id"];
	expires: Date;
	createdAt: Date;
	createdById: User["id"];
}
