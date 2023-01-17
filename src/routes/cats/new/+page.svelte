<script lang="ts">
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<h1>New Cat</h1>

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
