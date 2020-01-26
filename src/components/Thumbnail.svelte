<script>
  export let id;
  export let thumbnail;
  export let title;
</script>

<style>
  a {
    margin: 2em;
    display: block;
    width: 20vw;
    height: 13vh;
    background-color: blue;
  }

  div {
    height: 1.5em;
    padding: 0.5em;
    width: 100%;
    position: relative;
    top: calc(100% - 2em);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 90%;
    background-color: rgba(255, 255, 255, 0.658);
  }
</style>

<a href="/videos/{id}">
  <div>
    <p>{title}</p>
  </div>
</a>
