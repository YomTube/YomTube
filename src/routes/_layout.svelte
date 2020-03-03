<style>

</style>

<script>
	import Nav from "../components/Nav.svelte";
	export let segment;
</script>

{#if segment != 'login'}
	<Nav />
{/if}

<main>
	<slot />
</main>
