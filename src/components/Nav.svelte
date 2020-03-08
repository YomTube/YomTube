<style>
	nav {
		background-color: var(--fg);
		height: 4em;
		width: 100%;
		padding-right: 2%;
		position: sticky;
		top: 0;
		display: flex;
		z-index: 2;
		align-items: center;
		border-bottom: 3px solid rgba(255, 164, 0, 0.6);
		box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0, 0, 0, 0.5);
	}

	img {
		padding-left: 5em;
		display: block;
		width: auto;
		margin: 8px;
		height: auto;
	}

	h1 {
		font-size: 2.5em;
		font-weight: lighter;
		color: var(--bg);
	}

	a {
		color: var(--bg);
		margin: 1em;
		font-size: 1.2em;
		margin: 0em;
		text-decoration: none;
		transition: 0.08s ease-in;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pagetitle {
		margin: 1em;
	}

	.icon {
		margin: 0.5em;
		font-size: 2em;
		color: var(--orange);
	}

	a:hover {
		color: var(--orange);
	}

	span {
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	.mobile {
		display: none;
	}

	@media only screen and (max-width: 768px) {
		h1 {
			font-size: 1.4em;
		}

		.desktop {
			display: none;
		}

		.icon {
			margin: 0em;
		}

		.mobile {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		span {
			margin: 0;
		}
	}
</style>

<script>
	import Button from "./Button.svelte";
	import Loginicon from "./Loginicon.svelte";
	import Searchbox from "./Searchbox.svelte";
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
	let loggedIn;

	import { onMount } from "svelte";

	onMount(async () => {
		if (document.cookie.includes("token")) {
			loggedIn = true;
		} else loggedIn = false;
	});
</script>

<headerbar>
	<nav>
		<a class="pagetitle" href="/">
			<!-- <img src="{icon}" alt="an icon" /> -->
			<h1>{headerText}</h1>
		</a>
		<Searchbox />
		<span>
			{#each links as link}
				<a href="{link.link}">{link.text}</a>
			{/each}
			{#if loggedIn !== undefined && !loggedIn}
				{#each buttons as button}
					<Button
						link="{button.link}"
						text="{button.text}"
						{background}
						foreground="#009ffd" />
				{/each}
			{:else}
				<a href="/videos/upload">
					<i class="material-icons icon">video_call</i>
				</a>
				<Loginicon />
			{/if}
		</span>
	</nav>
</headerbar>
