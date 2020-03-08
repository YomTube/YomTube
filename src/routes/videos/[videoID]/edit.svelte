<style>
	.maincontainer {
		min-height: calc(100vh - 4em);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
    }
    
    .containedcontainer{
        width: 70%;
    }

	@media only screen and (max-width: 768px) {
		.maincontainer {
			background-color: white;
        }
        
        .containedcontainer{
            width: 100%;
        }
	}
</style>

<script context="module">
	export async function preload(page) {
		const { videoID } = page.params;
		const src = `/api/videos/${videoID}`;
		const videoResp = await this.fetch(src);
		const videoJSON = await videoResp.json();

		return { videoJSON, src };
	}
</script>

<script>
    export let videoJSON;
	import Metadataform from "../../../components/Metadataform.svelte";
</script>

<div class="maincontainer">
	<div class="containedcontainer">
		<Metadataform
			bg="#ffffff"
			accent1="#ffa400"
			accent2="#009ffd"
			message="Edit video"
			icon="../../../icons/uploadimage.svg"
			videotitle="{videoJSON.title}"
			description="{videoJSON.description}"
            selectedThumbnail="{videoJSON.primaryThumbnail}"
			hasCustomThumbnail="{videoJSON.customThumbnail}"
			videoID="{videoJSON._id}" />
	</div>

</div>
