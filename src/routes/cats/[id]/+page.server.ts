import { prisma } from "$lib/prisma";
import { updateCatSchema } from "$lib/updateCatSchema";
import { fail, redirect, type Load } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load: Load = ({ params }) => {
	return {
		cat: prisma.cat.findUnique({
			where: {
				id: params.id,
			},
		}),
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = Object.fromEntries(await request.formData());

		const validation = updateCatSchema.safeParse(formData);

		if (!validation.success)
			return fail(400, {
				fieldErrors: validation.error.flatten().fieldErrors,
				formErrors: validation.error.flatten().formErrors,
			});

		const cat = await prisma.cat.update({
			where: {
				id: params.id,
			},
			data: validation.data,
		});

		if (cat) {
			throw redirect(302, "/");
		}
	},
};
