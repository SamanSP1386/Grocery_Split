import z from "zod";
import { idValidator } from "./id.ts";

export const group = z.object({
	name: z.string().min(1).max(128)
});

export type NewGroup = z.infer<typeof group>;

export const groupOwner = z.object({
	ownerId: idValidator
});

export type UpdateGroupOwner = z.infer<typeof groupOwner>;

export const invite = z.object({
	expires: z.iso.datetime().transform((str) => new Date(str))
});

export type NewInvite = z.infer<typeof invite>;
