<style>

</style>

<script>
	import { onMount } from "svelte";
	import Videobox from "../components/Videobox.svelte";

	let videos = [];

	onMount(async () => {
		try {
			const response = await fetch(
				"https://yomtube.beppp.club/api/videos"
			);
			videos = await response.json();
			console.log(videos);
			if (videos.length == 0) throw new Error("No videos found");
		} catch (error) {
			console.error("Found some error");
			console.error(error);
		}
	});
</script>

<svelte:head>
	<title>Yomtube</title>
</svelte:head>

<Videobox title="Latest videos" {videos} />
