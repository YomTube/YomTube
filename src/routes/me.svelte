<style>
	.wrapper {
		height: calc(100vh - 4em);
		width: 100vw;
		padding: 0em;
	}
	.error {
		width: 100%;
		text-align: center;
		margin-top: 5%;
	}

	.uploadwrapper {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 5;
	}

	.inner-wrapper {
		width: 50%;
		height: 50%;
	}
</style>

<script>
	import { onMount } from "svelte";
	import Videobox from "../components/Videobox.svelte";
	import Userbanner from "../components/Userbanner.svelte";
	import Uploadbox from "../components/Uploadbox.svelte";
	import { slide } from "svelte/transition";
	let upload = false;
	let token;
	let me;
	let wrapper;
	let videos = [];

	const handleClick = e => {
		if (e.target == wrapper) {
			upload = false;
		}
	};

	onMount(async () => {
		if (!document.cookie.includes("token")) {
			return (window.location.href = "/");
		}
		let cookies = document.cookie;
		token = cookies
			.split(";")
			.filter(c => c.startsWith("token"))[0]
			.split("=")[1];

		let resp = await fetch("/api/users/me", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		let text = await resp.text();
		let obj = JSON.parse(text);
		me = obj.user;
		for await (let vid of me.videos) {
			try {
				let resp = await fetch(`/api/videos/` + vid.video, {
					method: "GET"
				});
				videos = videos.concat(await resp.json());
				console.log(videos);
			} catch (err) {
				console.error("error", err);
			}
		}
	});
</script>

<svelte:head>
	<title>Me</title>
</svelte:head>

<div class="wrapper">
	{#if me != undefined}
		<Userbanner
			on:upload="{() => {
				upload = true;
			}}"
			username="{me.username}"
			img="{me.profilePicture.data}"
			mime="{me.profilePicture.type}" />
	{/if}
	{#if videos.length > 0}
		<Videobox title="My videos" {videos} />
	{:else}
		<h1 class="error">You have no videos :(</h1>
	{/if}
</div>
