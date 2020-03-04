<style>
	.maincontainer {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 4em);
		align-items: center;
		justify-content: center;
	}

	.uploadcontainer {
		width: 70vw;
		height: 70vh;
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}

	.uploading {
		height: unset;
		min-height: 8em;
	}

	@media only screen and (max-width: 768px) {
		.maincontainer {
			background-color: #ffffff;
			justify-content: flex-start;
		}
	}
</style>

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
			icon="/uploadvideo.svg"
			uploadType="video"
			requestType="POST"
			requestURL="/api/videos/" />
	</div>

	<Metadataform
		bg="#ffffff"
		accent1="#ffa400"
		accent2="#009ffd"
		imgtext="Welcome back"
		icon="/uploadimage.svg"
		videotitle="{title}"
		visible="{uploading}"
		{videoID}
		message="Details" />
</div>

<script>
	import Uploadbox from "../components/Uploadbox.svelte";
	import Metadataform from "../components/Metadataform.svelte";

	let title;
	let uploading = false;
	let videoID;

	function drop(e) {
		title = e.detail.title;
		uploading = true;
	}

	function uploaded(e) {
		videoID = e.detail.videoID;
		console.log(videoID);
	}
</script>
