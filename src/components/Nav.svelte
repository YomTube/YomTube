<style>
	nav {
		background-color: var(--background);
		height: 4em;
		width: 100%;
		padding-right: 2%;
		display: flex;
		z-index: 2;
		align-items: center;
		border-bottom: 3px solid rgba(255, 164, 0, 0.6);
		box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0, 0, 0, 0.5);
	}

	img {
		padding-left: 5em;
		display: block;
		width: 3.5%;
		margin: 8px;
		height: auto;
	}

	h1 {
		font-size: 2.5em;
		font-weight: lighter;
		color: var(--foreground);
	}

	a {
		color: var(--foreground);
		margin: 1em;
		font-size: 1.2em;
		text-decoration: none;
		transition: 0.08s ease-in;
	}

	a:hover {
		color: var(--accent);
	}

	span {
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	@media only screen and (max-width: 768px) {
		h1 {
			font-size: 1.4em;
		}

		span {
			margin: 0;
		}
	}
</style>

<headerbar
	style="--foreground:{foreground}; --background:{background}; --accent:{accent};
	--accent2:{accent2};">
	<nav>
		<a href="/">
			<!-- <img src="{icon}" alt="an icon" /> -->
			<h1>{headerText}</h1>
		</a>
		<Searchbox />
		<span>
			{#each links as link}
				<a href="{link.link}">{link.text}</a>
			{/each}
			{#if !loggedIn}
				{#each buttons as button}
					<Button
						link="{button.link}"
						text="{button.text}"
						{background}
						foreground="#009ffd" />
				{/each}
			{:else}
				<Loginicon img="url(/stock.jpg)" />
			{/if}

		</span>
	</nav>
</headerbar>

<script>
	import Button from "./Button.svelte";
	import Loginicon from "./Loginicon.svelte";
	import Searchbox from "./Searchbox.svelte";
	export let icon = "";
	export let background = "#ffffff";
	export let foreground = "hsl(216, 7%, 15%)";
	export let accent = "#ffa400";
	export let accent2 = "#009ffd";
	export let headerText = "YOMTUBE";

	export let buttons = [
		{
			text: "Login",
			link: "/login"
		}
	];
	export let links = [];
	let loggedIn = false;

	import { onMount } from "svelte";

	onMount(async () => {
		if (document.cookie.includes("token")) {
			loggedIn = true;
		}
	});
</script>
