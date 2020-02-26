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
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		transition: all 0.1s ease-in-out;
	}

	.banner__image:hover {
		filter: brightness(50%);
	}

	.banner__image p {
		font-size: 0.8em;
		color: rgba(255, 255, 255, 0);
		transition: all 0.1s ease-in-out;
	}

	.banner__image:hover p {
		filter: brightness(250%);
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

<script>
	export let color = "#009ffd";
	export let img = "/stock.jpg";
	export let subscribers = "about three fiddy";
	export let username = "Clean";
	let text;
	if (subscribers == 1) {
		text = " subscriber";
	} else {
		text = " subscribers";
	}
</script>

<div style="--color: {color}; --icon: url({img});" class="banner">
	<div class="banner__image">
		<p>Upload image</p>
	</div>
	<span class="banner__textbox">
		<h1 class="banner__header">{username}</h1>
		<p class="p--light">{subscribers} {text}</p>
	</span>

</div>
