<style>
	.wrapper {
		height: calc(100vh - 4em);
		width: 100vw;
		padding: 5em;
	}
</style>

<script context="module">
	export async function preload(page, session) {}
</script>

<script>
	import Userbox from "../components/Userbox.svelte";
	import { onMount } from "svelte";
	let token;
	let me;
	onMount(async () => {
		// if (!document.cookie.includes("token"))
		// 	return (window.location.href = "/");
		// let cookies = document.cookie;
		// token = cookies.split("=")[1];
		// let resp = await fetch("/api/users/me", {
		// 	method: "GET",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: "Bearer " + token
		// 	}
		// });
		// me = await resp.text();
	});
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="wrapper">
	<p>{me}</p>
</div>
