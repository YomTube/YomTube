<style>
	body {
		width: 100vw;
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

<Videoplayer {videoJSON} {src} />
<div id="sidebar"></div>

<h1>{videoJSON.title}</h1>
<p>{videoJSON.description}</p>
