import { db } from "$lib/db";
import { updateCatSchema } from "$lib/updateCatSchema";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export async function load({ params }) {
	return {
		cat: await db.cat.findUnique({
			where: {
				id: params.id,
			},
		}),
	};
}

export const actions: Actions = {
	update: async ({ request, params }) => {
		const formData = Object.fromEntries(await request.formData());

		const validation = updateCatSchema.safeParse(formData);

		if (!validation.success)
			return fail(400, {
				fieldErrors: validation.error.flatten().fieldErrors,
				formErrors: validation.error.flatten().formErrors,
			});

		const cat = await db.cat.update({
			where: {
				id: params.id,
			},
			data: validation.data,
		});

		if (cat) {
			throw redirect(302, "/");
		}
	},
	delete: async ({ params }) => {
		const cat = await db.cat.delete({
			where: {
				id: params.id,
			},
		});

		if (cat) {
			throw redirect(302, "/");
		}
	},
};
