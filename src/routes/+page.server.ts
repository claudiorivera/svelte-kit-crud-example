import { catSchema } from "$lib/catSchema.js";
import { db } from "$lib/db";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export async function load({ url }) {
	return {
		cats: await db.cat.findMany({
			where: {
				AND: [
					{
						name: {
							contains: url.searchParams.get("name") || undefined,
							mode: "insensitive",
						},
					},
					{
						age: {
							gte: Number(url.searchParams.get("minAge")) || undefined,
							lte: Number(url.searchParams.get("maxAge")) || undefined,
						},
					},
				],
			},
		}),
	};
}

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
