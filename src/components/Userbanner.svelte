<style>
	.banner {
		width: 100vw;
		height: 15vh;
		background-color: var(--color);
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.banner__image {
		border-radius: 100%;
		height: 8vh;
		width: 8vh;
		margin: 1em;
		object-fit: cover;
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

<div style="--color: {color};" class="banner">
	<img class="banner__image" src="{img}" alt="Profile image" />
	<span class="banner__textbox">
		<h1 class="banner__header">{username}</h1>
		<p class="p--light">{subscribers} {text}</p>
	</span>

</div>
