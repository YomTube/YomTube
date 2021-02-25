<style>
	* {
		box-sizing: border-box;
	}

	.content {
		max-width: 420mm;
		width: 100%;

		display: grid;
		grid-template-areas: "player related" "comments related";
		grid-template-columns: auto 24rem;
		gap: 1rem;

		margin: 1rem auto 0;
		padding: 0 1rem;
	}

	.player {
		grid-area: player;

		width: 100%;
		background-color: var(--fg);

		border-radius: var(--border-radius);
		padding: 0;

		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
			0 6px 6px rgba(0, 0, 0, 0.23);
	}

	.videodetails {
		padding: 1em;
		color: var(--bg);
	}

	.bar {
		height: 4em;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.uploader {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uploader img {
		height: 75%;
		border-radius: 50%;
		margin-right: 0.75em;
	}

	.views {
		color: #606060;
	}

	@media only screen and (max-width: 1200px) {
		.content {
			grid-template-areas: "player player" "comments related";
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media only screen and (max-width: 768px) {
		.content {
			grid-template-areas: "player" "comments" "related";
			grid-template-columns: 1fr;
		}
	}
</style>

<script context="module">
	export async function preload(page) {
		const { videoID } = page.params;
		const src = `/api/videos/${videoID}`;
		const videoResp = await this.fetch(src);

		if (!videoResp.ok) return this.error(404, "Not found");

		const videoJSON = await videoResp.json();

		return { videoJSON, src };
	}
</script>

<script>
	import { onMount } from "svelte";
	import Videoplayer from "../../../components/Videoplayer.svelte";
	import Videobox from "../../../components/Videobox.svelte";
	import Commentbox from "../../../components/Commentbox.svelte";
	export let videoJSON;
	export let src;
	let videos = [];

	let height = 240;

	onMount(async () => {
		try {
			const response = await fetch(`/api/videos/`);
			videos = await response.json();
			if (videos.length == 0) throw new Error("No videos found");
		} catch (error) {
			console.error("Found some error", error);
		}
	});
</script>

<svelte:head>
	<title>YomTube - {videoJSON.title}</title>
</svelte:head>

<div class="content">
	<div class="player">
		<Videoplayer videoJSON="{videoJSON}" src="{src}" />
		<div class="videodetails">
			<h1 class="title">{videoJSON.title}</h1>
			<div class="bar">
				<div class="uploader">
					<img
						src="data:{videoJSON.uploaded_by.profilePicture
							.contentType};base64,{videoJSON.uploaded_by
							.profilePicture.data}"
						alt="" />
					<p class="author">
						{videoJSON.uploaded_by.username}
					</p>
				</div>
				<p class="views">
					{videoJSON.views} views • {videoJSON.uploaded_at.substring(
						0,
						10
					)}
				</p>
			</div>
			<details>{videoJSON.description || ""}</details>
		</div>
	</div>
	<div style="grid-area: comments;">
		<Commentbox id="{videoJSON._id}" />
	</div>
	<div style="grid-area: related;">
		<Videobox
			title="<s>Related</s> videos"
			videos="{videos}"
			orientation="vertical" />
	</div>
</div>
