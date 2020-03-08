<style>
	.maincontainer {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 4em);
		align-items: center;
		justify-content: center;
	}

	.uploadcontainer {
		width: 70%;
		height: 70vh;
		display: flex;
		justify-content: center;
	}

	.uploading {
		height: unset;
		min-height: 8em;
		padding-top: 2em;
	}

	.metadatacontainer {
		padding-bottom: 2em;
		width: 70%;
		padding-top: 3em;
	}

	@media only screen and (max-width: 768px) {
		.maincontainer {
			background-color: var(--fg);
			justify-content: flex-start;
		}

		.metadatacontainer {
			width: 100%;
			padding: 0;
			/* height: calc(100vh - 4em); */
		}

		.uploadcontainer {
			width: 100%;
		}
	}
</style>

<script>
	import Uploadbox from "../../components/Uploadbox.svelte";
	import Metadataform from "../../components/Metadataform.svelte";

	let title;
	let uploading = false;
	let videoID;

	function drop(e) {
		title = e.detail.title;
		uploading = true;
	}

	function uploaded(e) {
		videoID = e.detail.videoID;
	}
</script>

<svelte:head>
	<title>Upload</title>
</svelte:head>

<div class="maincontainer">
	<div class="uploadcontainer" class:uploading>
		<Uploadbox
			on:filedrop="{drop}"
			on:fileuploaded="{uploaded}"
			bg="#ffffff"
			accent1="#ffa400"
			accent2="#009ffd"
			icon="/icons/uploadvideo.svg"
			uploadType="video"
			requestType="POST"
			requestURL="/api/videos/" />
	</div>

	{#if uploading}
		<div class="metadatacontainer">
			<Metadataform
				bg="#ffffff"
				accent1="#ffa400"
				accent2="#009ffd"
				icon="/icons/uploadimage.svg"
				videotitle="{title}"
				visible="{uploading}"
				{videoID}
				message="Details" />
		</div>
	{/if}
</div>
