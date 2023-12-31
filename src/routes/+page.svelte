<script lang="ts">
	import type { ActionData, PageData } from "./$types";

	export let data: PageData;
	export let form: ActionData;
</script>

<h1>Home</h1>

<hr />

<h2>Search Cats</h2>
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

<h3>Results</h3>
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Age</th>
		</tr>
	</thead>
	<tbody>
		{#each data.cats as cat}
			<tr>
				<td>{cat.name}</td>
				<td>{cat.age}</td>
				<td><a href="/cats/{cat.id}">View</a></td>
				<td>
					<form method="post" action="/cats/{cat.id}?/delete">
						<button>Delete</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<hr />

<h2>New Cat</h2>
<form method="POST">
	<div>
		<label
			>Name
			<input type="text" name="name" />
			{#if form?.fieldErrors?.name}
				{#each form.fieldErrors.name as error}
					<div>{error}</div>
				{/each}
			{/if}
		</label>
	</div>
	<div>
		<label
			>Age
			<input type="number" inputmode="numeric" name="age" />
			{#if form?.fieldErrors?.age}
				{#each form.fieldErrors.age as error}
					<div>{error}</div>
				{/each}
			{/if}
		</label>
	</div>

	<button>Save Changes</button>
</form>
