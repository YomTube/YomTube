<script>
  export let id;
  export let thumbnail = "url(/matt.jpg)";
  export let title;
</script>

<style>
  a {
    border-radius: 0.4em;
    display: block;
    width: 95%;
    height: 90%;
    background-image: var(--thumbnail);
    background-size: cover;
    background-position: center;
    text-decoration: none;
    transition: all 0.3s;
  }

  a:hover {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }

  div {
    height: 2em;
    border-bottom-left-radius: 0.4em;
    border-bottom-right-radius: 0.4em;
    padding-left: 0.5em;
    width: 100%;
    position: relative;
    top: calc(100% - 2em);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 90%;
    color: #232528;
    background-color: rgba(234, 246, 255, 0.658);
  }
</style>

<a style="--thumbnail: {thumbnail};" href="/videos/{id}">
  <div>
    <p>{title}</p>
  </div>
</a>
