import { z } from "zod";

export const updateCatSchema = z.object({
	name: z.string().min(1, "Name must contain at least 1 character").optional(),
	age: z.coerce.number().gt(0, "Age must be greater than 0").optional(),
});
