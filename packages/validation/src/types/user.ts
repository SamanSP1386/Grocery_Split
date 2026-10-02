import type { ID } from "./id.ts";

export interface User {
	id: ID;
	email: string;
	name: string;
	pictureUrl: string;
	createdAt: Date;
}
