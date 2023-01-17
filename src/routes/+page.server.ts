import { deleteCatSchema } from "$lib/deleteCatSchema";
import { PrismaClient } from "@prisma/client";
import { redirect, type Load } from "@sveltejs/kit";
import type { Actions } from "./$types";

const prisma = new PrismaClient();

export const load: Load = () => {
	return {
		cats: prisma.cat.findMany(),
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		const validation = deleteCatSchema.parse(formData);

		const cat = await prisma.cat.delete({
			where: {
				id: validation.id,
			},
		});

		if (cat) {
			throw redirect(303, "/");
		}
	},
};
