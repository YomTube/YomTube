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
		const video = await this.fetch(src);
		return { video };
	}
</script>

<script>
	export let src;
</script>

<svelte:head>
	<title>Yomtube</title>
</svelte:head>

<video controls>
	<source {src} type="video/mp4" />
</video>
