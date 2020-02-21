<style>
	#conatiner {
		background-color: var(--bg);
		border-radius: 0.4em;
		width: 70vw;
		display: flex;
		justify-content: center;
		margin-top: 3em;
	}

	.textfield {
		width: 100%;
		border-radius: 0.5em;
		border: 1px solid grey;
		background: #ffffff;
		height: 3em;
		padding: 0.5em;
		margin-bottom: 1em;
		margin-top: 0.2em;
	}

	.hidden {
		display: none !important;
	}

	label {
		color: black;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 50%;
		color: #000000;
	}

	h1 {
		color: var(--accent1);
		padding-top: 1em;
		padding-bottom: 0.3em;
	}

	.thumbnail_container {
		display: flex;
		flex-direction: row;
		/* justify-content: center; */
	}

	.thumbnail {
		background-color: purple;
		width: calc(16 * 0.3em);
		height: calc(9 * 0.3em);
		margin-right: 0.3em;
		border-radius: 0.2em;
	}

	.upload_thumbnail {
		background-color: orange !important;
	}

	.button {
		border: 2px solid var(--accent1);
		border-radius: 0.5em;
		padding: 0.3em 1.5em;
		font-size: 1.2em;
		overflow: hidden;
		background: none;
		transition: 0.08s ease-in;
		color: var(--accent1);
		/* width: 20%; */
		text-align: right;
		margin-top: 1em;
	}

	.button:before {
    content: "";
    position: absolute;
    background: var(--foreground);
    bottom: 0;
    left: 0;
    right: 0;
    top: 100%;
    z-index: -1;
    transition: top 0.09s ease-in;
  }

	.buttonContainer{
		/* display: flex;
		justify-content: flex-start;
		width: 100%; */
	}

	.buttonContainerContainer{
		margin: 1em 0;
	}

</style>

<script>
	export let fg;
	export let bg;
	export let accent1;
	export let accent2;
	export let icon;
	export let message;

	export let videotitle;
	export let visible;
	export let videoID;

	import Button from "../components/Button.svelte";
	// const dispatch = createEventDispatcher();

	$: console.log(videoID);


</script>

<div
	id="conatiner"
	style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};
	--upload-icon: url({icon})"
	class:hidden="{!visible}">

	<form action="">
		<h1>{message}</h1>
		<label for="title">Title</label>
		<input
			id="title"
			type="text"
			class="textfield"
			value="{videotitle}" />
		<label for="description">Description</label>
		<input id="description" type="text" class="textfield" />

		<b>Thumbnail</b>
		<div class="thumbnail_container">
			<img src="http://yomtube.z:3000/api/" alt="">
			<div class="upload_thumbnail thumbnail"></div>
			<div class="thumbnail_1 thumbnail"></div>
			<div class="thumbnail_2 thumbnail"></div>
			<div class="thumbnail_3 thumbnail"></div>
		</div>

		<div class="buttonContainer">
			<!-- <button class="button">Save</button> -->
			<div class="buttonContainerContainer">
				<Button text="Save" background="white" foreground="#FFA400"></Button>
			</div>
		</div>
	</form>

</div>
