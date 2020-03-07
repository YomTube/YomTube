<style>
	* {
		box-sizing: border-box;
	}

	.playerbox {
		background-color: var(--fg);
		border-radius: var(--border-radius);
		padding: 0;
		grid-area: player;
		max-width: 1280px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
			0 6px 6px rgba(0, 0, 0, 0.23);
		width: 100vmin;
	}

	.videodetails {
		padding: 1em;
	}

	.title {
		color: var(--bg);
	}

	details {
		color: var(--bg);
	}

	.author {
		color: var(--bg);
	}

	.date {
		color: #606060;
	}

	.content {
		padding: 1em 0;
		margin: 0 auto;
		display: grid;
		margin: 0 auto;
		justify-content: center;
		grid-template-columns: auto 402px;
		grid-template-rows: auto auto;
		grid-template-areas:
			"player recommended"
			"comments recommended";
	}

	@media only screen and (max-width: 1920px) {
		.content {
			margin: none;
		}
	}

	@media only screen and (max-width: 768px) {
		.content {
			flex-direction: column;
			flex-wrap: wrap;
			margin: 0;
			padding: 0;
			width: 100%;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(auto, 3);
			grid-template-areas:
				"player"
				"recommended"
				"comments";
		}
		.playerbox {
			width: 100%;
			border-radius: 0em;
			box-shadow: none;
			margin: 0;
			padding: 0;
		}
	}
</style>

<script context="module">
	export async function preload(page) {
		const videoID = page.params.video;
		const src = `/api/videos/${videoID}`;
		const resp = await this.fetch(src);
		const json = await resp.json();
		const videoJSON = json.video;

		return { videoJSON, src };
	}
</script>

<script>
	import { onMount } from "svelte";
	import Videoplayer from "../../components/Videoplayer.svelte";
	import Videobox from "../../components/Videobox.svelte";
	import Commentbox from "../../components/Commentbox.svelte";
	export let videoJSON;
	export let src;
	console.log(videoJSON);
	let videos = [];
	onMount(async () => {
		try {
			const response = await fetch(`/api/videos/`);
			videos = await response.json();
			if (videos.length == 0) throw new Error("No videos found");
		} catch (error) {
			console.error("Found some error");
			console.error(error);
		}
	});
</script>

<svelte:head>
	<title>YomTube - {videoJSON.title}</title>
</svelte:head>

<div class="content">
	<div class="playerbox">
		<Videoplayer {videoJSON} {src} />
		<div class="videodetails">
			<h1 class="title">{videoJSON.title}</h1>
			<p class="date">{videoJSON.uploaded_at.substring(0, 10)}</p>
			<p class="author">{videoJSON.uploaded_by.username}</p>
			<details>{videoJSON.description}</details>
		</div>
	</div>
	<div style="grid-area: comments;">
		<Commentbox />
	</div>
	<div style="grid-area: recommended;">
		<Videobox
			title="<s>Related</s> videos"
			{videos}
			orientation="vertical" />
	</div>
</div>
