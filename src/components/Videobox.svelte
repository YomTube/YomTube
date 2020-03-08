<style>
	* {
		box-sizing: border-box;
	}
	h1 {
		color: var(--fg);
		grid-area: title;
		justify-self: start;
		font-size: 2em;
		font-weight: bold;
		border-bottom: 1px solid var(--accent);
		align-self: center;
		width: 100%;
	}
	h2 {
		color: var(--fg);
		grid-area: title;
		justify-self: start;
		font-size: 1.7em;
		font-weight: bold;
		align-self: center;
		width: 100%;
	}
	div {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		min-height: 200px;
		background-color: var(--bg);
		border-radius: 0.25rem;
		padding: 0.5em;
		box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
			0 15px 12px rgba(0, 0, 0, 0.22);
	}

	.horizontal {
		width: 85%;
		margin: 1em;
	}

	.vertical {
		width: 402px;
		min-width: 402px;
		max-width: 402px;
		margin: 0 1em;
		flex-direction: column;
		align-items: center;
	}

	@media only screen and (max-width: 1920px) {
	}

	@media only screen and (max-width: 768px) {
		.horizontal {
			box-shadow: none;
			width: 100%;
			margin: 0;
			padding: 0;
			border-radius: 0;
			background-color: transparent;
		}
		.vertical {
			box-shadow: none;
			width: 100%;
			min-width: none;
			max-width: none;
			margin: 0;
			padding: 0;
			border-radius: 0;
			background-color: transparent;
		}
		h1 {
			display: none;
		}
	}
</style>

<script>
	export let videos = [];
	export let bg = "#ffffff";
	export let fg = "hsl(216, 7%, 15%)";
	export let accent = "#ffa400";
	export let title = "Default";
	export let orientation = "horizontal";
	import Thumbnail from "./Thumbnail.svelte";
</script>

<div
	class="{orientation}"
	id="box"
	style="--bg: {bg}; --fg: {fg}; --accent: {accent};">
	<h1>
		{@html title}
	</h1>
	{#if videos}
		{#each videos as video}
			<Thumbnail {orientation} {video} />
		{:else}
			<h2>No videos...</h2>
		{/each}
	{:else}
		<h2>Loading...</h2>
	{/if}
</div>
