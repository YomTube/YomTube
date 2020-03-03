<style>
	div {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 4em);
		align-items: center;
		justify-content: center;
	}

	@media only screen and (max-width: 768px) {
		div {
			background-color: #ffffff;
			justify-content: flex-start;
		}
	}
</style>

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
	}
</script>

<svelte:head>
	<title>Upload</title>
</svelte:head>

<div>
	<Uploadbox
		on:filedrop="{drop}"
		on:fileuploaded="{uploaded}"
		bg="#ffffff"
		accent1="#ffa400"
		accent2="#009ffd"
		imgtext="Welcome back"
		icon="/uploadvideo.svg"
		uploadtype="video" />

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
