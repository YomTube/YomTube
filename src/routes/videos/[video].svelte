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
		const { video } = json;

		return { video, src };
	}
</script>

<script>
	// TODO Create scrubbing
	// volume sliding
	// Bufferbar

	import Videoplayer from "../../components/Videoplayer.svelte";
	export let video;
	export let src;
</script>

<svelte:head>
	<title>Yomtube</title>
</svelte:head>

<Videoplayer {video} {src} />
<div id="sidebar"></div>

<h1>{video.title}</h1>
<p>{video.description}</p>
