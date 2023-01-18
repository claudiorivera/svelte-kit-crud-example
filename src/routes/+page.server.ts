import { prisma } from "$lib/prisma";
import type { Load } from "@sveltejs/kit";

export const load: Load = ({ url }) => {
	return {
		cats: prisma.cat.findMany({
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
};
