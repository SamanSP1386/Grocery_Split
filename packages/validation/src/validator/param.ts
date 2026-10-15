import z from "zod";
import { idValidator } from "./id.ts";

export const groupParams = z.object({
	groupId: idValidator
});

export const groupTripParams = z.object({
	groupId: idValidator,
	tripId: idValidator
});
