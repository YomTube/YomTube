<script>
  import { onMount } from "svelte";
  import Thumbnail from "../components/Thumbnail.svelte";

  let videos = [];

  onMount(async () => {
    try {
      const response = await fetch("https://yomtube.beppp.club/api/videos");
      videos = await response.json();
      console.log(videos);
      if (videos.length == 0) throw new Error("No videos found");
    } catch (error) {
      console.error("Found some error");
      console.error(error);
    }
  });
</script>

<style>

</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

{#each videos as video}
  <Thumbnail id={video._id} title={video.title} />
{/each}
