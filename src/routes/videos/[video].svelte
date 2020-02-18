<style>
	.playerbox {
		display: inline-block;
		margin: 1em;
		background-color: white;
		border-radius: 1em;
		padding: 1em;
		color: #ffa40f;
	}
</style>

<script context="module">
	export async function preload(page) {
		const videoID = page.params.video;
		const src = `${process.env.BASE_URL}/api/videos/${videoID}`;
		const resp = await this.fetch(src);
		const json = await resp.json();
		const videoJSON = json.video;

		return { videoJSON, src };
	}
</script>

<script>
	// TODO Create scrubbing
	// volume sliding
	// Bufferbar

	import Videoplayer from "../../components/Videoplayer.svelte";
	export let videoJSON;
	export let src;
</script>

<svelte:head>
	<title>Yomtube</title>
</svelte:head>
<div class="playerbox">
	<Videoplayer {videoJSON} {src} />
	<h1>{videoJSON.title}</h1>
	<details>{videoJSON.description}</details>
</div>
<div id="sidebar"></div>
