<script>
  export let videos = [];
  export let bg = "#ffffff";
  export let fg = "hsl(216, 7%, 15%)";
  export let accent = "#ffa400";
  export let title = "Default";
  import Thumbnail from "./Thumbnail.svelte";
</script>

<style>
  h1 {
    color: var(--fg);
    grid-area: title;
    justify-self: start;
    font-size: 2em;
    font-weight: bold;
    border-bottom: 1px solid var(--accent);
    align-self: center;
    width: 100%;
  }
  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 20% 80%;
    grid-template-areas:
      "title title title title title"
      "1 2 3 4 5";
    justify-items: center;
    align-items: center;
    width: 80%;
    height: 10vw;
    min-height: 200px;
    background-color: var(--bg);
    border-radius: 1em;
    margin: 1em;
    padding: 1em;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
</style>

<div style="--bg: {bg}; --fg: {fg}; --accent: {accent};">
  <h1>{title}</h1>
  {#each videos as video, i}
    <Thumbnail style="grid-area:{i};" id={video._id} title={video.title} />
  {/each}
</div>
