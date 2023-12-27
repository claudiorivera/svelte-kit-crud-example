import { db } from "$lib/db";

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
