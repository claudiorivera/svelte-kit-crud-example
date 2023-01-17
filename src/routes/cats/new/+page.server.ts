import { PrismaClient } from "@prisma/client";
import { fail, redirect } from "@sveltejs/kit";
import { createCatSchema } from "$lib/createCatSchema";
import type { Actions } from "./$types";

const prisma = new PrismaClient();

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		const validation = createCatSchema.safeParse(formData);

		if (!validation.success)
			return fail(400, {
				fieldErrors: validation.error.flatten().fieldErrors,
				formErrors: validation.error.flatten().formErrors,
			});

		const cat = await prisma.cat.create({
			data: validation.data,
		});

		if (cat) {
			throw redirect(303, "/");
		}
	},
};
