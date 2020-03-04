<style>
	.banner {
		width: 100vw;
		height: 20vh;
		padding: 0 2%;
		background-color: var(--color);
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.banner__image {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		height: 5em;
		width: 5em;
		margin: 1em;
		background-image: var(--icon);
		background-color: rgba(0, 0, 0, 0);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		transition: all 0.1s ease-in-out;
	}

	.banner__image:hover {
		background-color: rgba(0, 0, 0, 0.5);
		background-blend-mode: multiply;
	}

	.banner__image p {
		font-size: 65%;
		word-wrap: none;
		color: rgba(255, 255, 255, 0);
		transition: all 0.1s ease-in-out;
	}

	.banner__image:hover p {
		color: rgba(255, 255, 255, 1);
	}

	.banner__textbox {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}

	.p--light {
		color: rgba(230, 230, 230, 0.8);
	}
</style>

<div style="--color: {color}; --icon: url({img});" class="banner">
	<div on:click="{() => dispatch('upload')}" class="banner__image">
		<p>Upload image</p>
	</div>
	<span class="banner__textbox">
		<h1 class="banner__header">{username}</h1>
		<p class="p--light">{subscribers} {text}</p>
	</span>

</div>

<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let color = "#009ffd";
	export let img = "/stock.jpg";
	export let subscribers = "about three fiddy";
	export let username = "You shouldn't be seeing this";
	let text;
	if (subscribers == 1) {
		text = " subscriber";
	} else {
		text = " subscribers";
	}
</script>
