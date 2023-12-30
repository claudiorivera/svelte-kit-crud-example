import { catSchema } from "$lib/catSchema";
import { db } from "$lib/db";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		const validation = catSchema.safeParse(formData);

		if (!validation.success)
			return fail(400, {
				fieldErrors: validation.error.flatten().fieldErrors,
				formErrors: validation.error.flatten().formErrors,
			});

		const cat = await db.cat.create({
			data: validation.data,
		});

		if (cat) {
			throw redirect(302, "/");
		}
	},
};
