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

    form{
        display: flex;
        flex-direction: column;
        width: 50%;
		color: #000000;
    }

	h1{
		color: var(--accent1);
		padding-top: 1em;
		padding-bottom: 0.3em;
	}

	.thumbnail_container{
		display: flex;
		flex-direction: row;
	}

	.thumbnail{
		background-color: purple;
		width: calc(16*0.3em);
		height: calc(9*0.3em);
	}

	.upload_thumbnail{
		background-color: orange !important;
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
	export let vissible;
	console.log("vissible" + vissible);
	// let vissible = true;
</script>

<div
	id="conatiner"
	style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};
	--upload-icon: url({icon})"
	class:hidden="{!vissible}"
>

	<form action="">
		<h1>{message}</h1>
		<label for="title">Title</label>
		<input id="title" type="text" class="textfield" value="{videotitle}" />
		<label for="description">Description</label>
		<input id="description" type="text" class="textfield" />

		<b>Thumbnail</b>
		<div class="thumbnail_container">
			<div class="upload_thumbnail thumbnail"></div>
			<div class="thumbnail_1 thumbnail"></div>
			<div class="thumbnail_2 thumbnail"></div>
			<div class="thumbnail_3 thumbnail"></div>
		</div>
	</form>

</div>
