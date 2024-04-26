<script lang="ts">
import type { ActionData, PageData } from "./$types";

export let data: PageData;
export let form: ActionData;
</script>

<h1>Cat Details</h1>

<form method="POST" action="?/update">
	<div>
		<label
			>Name
			<input type="text" name="name" value={data.cat?.name} />
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
			<input
				type="number"
				inputmode="numeric"
				name="age"
				value={data.cat?.age}
			/>
			{#if form?.fieldErrors?.age}
				{#each form.fieldErrors.age as error}
					<div>{error}</div>
				{/each}
			{/if}
		</label>
	</div>

	<button>Save Changes</button>
</form>
