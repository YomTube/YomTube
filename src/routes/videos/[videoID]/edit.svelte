<style>

</style>

<script context="module">
	export async function preload(page) {
		const { videoID } = page.params;

		return { videoID };
	}
</script>

<script>
	export let videoJSON;
</script>

<div class="content"></div>
