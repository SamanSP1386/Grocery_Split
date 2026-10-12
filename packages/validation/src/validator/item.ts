import z from "zod";

export const item = z.object({
	name: z.string().min(1).max(128),
	quantity: z.string().max(128).nullable(),
	notes: z.string().max(1024).nullable(),
	price: z.number().min(0).max(99_999)
});

export type NewItem = z.infer<typeof item>;

export const wantedItem = z.object({
	parts: z.int32().min(0)
});

export type NewWantedItem = z.infer<typeof wantedItem>;
