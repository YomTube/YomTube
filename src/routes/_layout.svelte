<script>
	import Nav from "../components/Nav.svelte";
	export let segment;
</script>

<style>

</style>

{#if segment != 'login'}
	<Nav />
{/if}
<main>
	<slot />
</main>
