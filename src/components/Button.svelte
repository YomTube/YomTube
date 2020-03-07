<style>
	.button {
		position: relative;
		border: 2px solid var(--foreground);
		border-radius: 0.5em;
		padding: 0.3em 1.5em;
		display: flex;
		font-size: 1.2em;
		align-items: center;
		align-content: center;
		z-index: 1;
		overflow: hidden;
		background: none;
		transition: 0.08s ease-in;
		color: var(--foreground);
	}

	.button:hover {
		color: var(--background);
		cursor: pointer;
	}

	.button:hover {
		color: var(--background);
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

	.button:hover:before {
		top: 0;
	}
</style>

<script>
	export let text = "button";
	export let link = "#";
	export let background = "black";
	export let foreground = "#ff3e00";
	export let onclick;

	function redirect(e) {
		if (link != "#") {
			window.location.href = `${link}`;
		}
		onclick();
	}

</script>

<button
	on:click|preventDefault|stopPropagation="{redirect}"
	style="--foreground:{foreground}; --background:{background};"
	class="button">
	{text}
</button>
