<style>
	div {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 4em);
		align-items: center;
		justify-content: center;
	}
	
</style>

<script>
	import Uploadbox from "../components/Uploadbox.svelte";
	import Metadataform from "../components/Metadataform.svelte";

	let title;
	let uploading = false;

	function drop(e) {
		title = e.detail.title;
		uploading = true;
	}
</script>

<svelte:head>
	<title>Upload</title>
</svelte:head>

<div>
	<Uploadbox
	on:filedrop="{drop}"
		bg="#ffffff"
		accent1="#ffa400"
		accent2="#009ffd"
		imgtext="Welcome back"
        icon="/uploadicon.svg"
	/>

	<Metadataform
		bg="#ffffff"
		accent1="#ffa400"
		accent2="#009ffd"
		imgtext="Welcome back"
        icon="/uploadicon.svg"
		videotitle={title}
		vissible={uploading}
		message="Details"
	/>
</div>
