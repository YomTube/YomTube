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
		position: relative;
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
		font-size: 68%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		white-space: nowrap;
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
	.fileup {
		width: 100%;
		height: 100%;
		opacity: 0;
		position: absolute;
		z-index: 10;
	}
</style>

<script>
	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";
	const dispatch = createEventDispatcher();

	export let color = "#009ffd";
	export let img = "/stock.jpg";
	export let subscribers = "about three fiddy";
	export let username = "You shouldn't be seeing this";
	export let mime;
	let text;
	let fileup;
	let form;

	onMount(async () => {
		fileup.onchange = async () => {
			let pic = fileup.files[0];
			let formData = new FormData(form);
			let cookies = document.cookie;
			let token = cookies
				.split(";")
				.filter(c => c.startsWith("token"))[0]
				.split("=")[1];

			let resp = await fetch("/api/users/me/picture", {
				method: "PUT",
				headers: {
					Authorization: "Bearer " + token
				},
				body: formData
			});
			location.reload();
		};
	});

	if (subscribers == 1) {
		text = " subscriber";
	} else {
		text = " subscribers";
	}
</script>

<div
	style="--color: {color}; --icon: url(data:{mime};base64,{img});"
	class="banner">
	<div on:click="{() => dispatch('upload')}" class="banner__image">
		<form bind:this="{form}">
			<input
				bind:this="{fileup}"
				class="fileup"
				type="file"
				name="file" />
		</form>
		<p class="uploadtext">Upload image</p>
	</div>
	<span class="banner__textbox">
		<h1 class="banner__header">{username}</h1>
		<p class="p--light">{subscribers} {text}</p>
	</span>

</div>
