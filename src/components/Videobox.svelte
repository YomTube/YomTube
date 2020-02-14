<style>
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
	div {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		width: 85%;
		min-height: 200px;
		background-color: var(--bg);
		border-radius: 1em;
		margin: 1em;
		padding: 1em;
		box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
			0 15px 12px rgba(0, 0, 0, 0.22);
	}

	@media only screen and (max-width: 1600px) {
		div {
			width: calc(100% - 2em);
		}
	}

	@media only screen and (max-width: 768px) {
		div {
			width: 100%;
			margin: 0;
			padding: 0;
			border-radius: 0;
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
	import Thumbnail from "./Thumbnail.svelte";
	// console.log(videos);
</script>

<div id="box" style="--bg: {bg}; --fg: {fg}; --accent: {accent};">
	<h1>{title}</h1>
	{#each videos as video, i}
		<Thumbnail
			style="grid-area:{i};"
			id="{video._id}"
			title="{video.title}"
		/>
	{/each}
</div>
