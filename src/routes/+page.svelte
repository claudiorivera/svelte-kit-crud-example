<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1>All Cats</h1>

<form>
	<label>
		Name
		<input type="search" name="name" />
	</label>
	<label>
		Min Age
		<input type="number" inputmode="numeric" name="minAge" />
	</label>
	<label>
		Max Age
		<input type="number" inputmode="numeric" name="maxAge" />
	</label>
	<button type="reset">Reset</button>
	<button>Search</button>
</form>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Age</th>
		</tr>
	</thead>
	<tbody>
		{#if data}
			{#each data.cats as cat}
				<tr>
					<td>{cat.name}</td>
					<td>{cat.age}</td>
					<td><a href="/cats/{cat.id}">View</a></td>
					<td>
						<form method="post" action="?/delete">
							<input type="hidden" name="id" value={cat.id} />
							<button>Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>
