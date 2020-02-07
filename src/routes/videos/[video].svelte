<style>
	video {
		width: 80vw;
		height: 80vh;
	}
</style>

<script context="module">
	export async function preload(page) {
		const videoID = page.params.video;
		const src = `${process.env.BASE_URL}:${process.env.PORT}/api/videos/${videoID}`;
		const resp = await this.fetch(src);
		const json = await resp.json();
		const { video } = json;

		return { video, src };
	}
</script>

<script>
	export let video;
	export let src;
</script>

<svelte:head>
	<title>Yomtube</title>
</svelte:head>

<video controls>
	{#each video.available_qualities as quality}
		<source src="{src}/{quality}" type="video/mp4" />
	{/each}
</video>

<h1>{video.title}</h1>
<p>{video.description}</p>
