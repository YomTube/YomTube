<style>

</style>

<script>
	import Nav from "../components/Nav.svelte";
	export let segment;
</script>

{#if segment != 'login'}
	<Nav headertext="" />
{/if}

<svelte:body />

<main>
	<slot />
</main>
