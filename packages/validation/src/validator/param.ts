import z from "zod";
import { idValidator } from "./id.ts";

export const groupParams = z.object({
	groupId: idValidator
});

export const groupTripParams = z.object({
	groupId: idValidator,
	tripId: idValidator
});

export const groupItemParams = z.object({
	groupId: idValidator,
	itemId: idValidator
});

export const tripQuery = z.object({
	tripId: idValidator.optional()
});
