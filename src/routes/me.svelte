<style>
	.wrapper {
		height: calc(100vh - 4em);
		width: 100vw;
		padding: 0em;
	}
</style>

<script>
	import { onMount } from "svelte";
	import Videobox from "../components/Videobox.svelte";
	import Userbanner from "../components/Userbanner.svelte";
	let token;
	let me;
	let videos = [];
	onMount(async () => {
		if (!document.cookie.includes("token")) {
			return (window.location.href = "/");
		}
		let cookies = document.cookie;
		token = cookies
			.split(";")
			.filter(c => c.startsWith("token"))[0]
			.split("=")[1];

		let resp = await fetch(process.env.BASE_URL + "/api/users/me", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		let text = await resp.text();
		me = JSON.parse(text);
		for await (let vid of me.videos) {
			let resp = await fetch(`/api/videos/` + vid.video, {
				method: "GET"
			});
			let { video } = await resp.json();
			videos.push(video);
			videos = videos;
		}
	});
	let string = toString(videos);
</script>

<svelte:head>
	<title>Me</title>
</svelte:head>

<div class="wrapper">
	{#if me != undefined}
		<Userbanner username="{me.username}" />
	{/if}
	{#if videos[0] != undefined}
		<Videobox title="My videos" {videos} />
	{:else}
		<h1>You have no videos :(</h1>
	{/if}
</div>
