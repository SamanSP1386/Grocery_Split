import type { ID } from "./id.ts";

export interface User {
	id: ID;
	name: string;
	email: string;
	image?: string;
}
