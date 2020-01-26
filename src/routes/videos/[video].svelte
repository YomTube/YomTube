<script context="module">
  export async function preload(page) {
    const video = page.params.video;
    const src = "https://yomtube.beppp.club/api/videos/" + video;
    return { src };
  }
</script>

<script>
  export let src;
</script>

<style>
  video {
    width: 80vw;
    height: 80vh;
  }
</style>

<svelte:head>
  <title>Yomtube</title>
</svelte:head>

<video controls>
  <source {src} type="video/mp4" />
</video>
