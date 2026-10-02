import z from "zod";

export const group = z.object({
	name: z.string().min(1).max(128)
});

export type NewGroup = z.infer<typeof group>;

export const invite = z.object({
	expires: z.iso.datetime()
});

export type NewInvite = z.infer<typeof invite>;
