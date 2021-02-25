<style>
	* {
		box-sizing: border-box;
	}
	.commentbox {
		background-color: var(--fg);
		padding: 1em;
		width: 100%;
		border-radius: var(--border-radius);
		color: var(--bg);
	}
	.title {
		font-size: 2em;
		font-weight: bold;
		border-bottom: 1px solid var(--orange);
		width: 100%;
	}

	@media only screen and (max-width: 768px) {
		.commentbox {
			background-color: transparent;
			margin-top: 0;
			padding-top: 0;
		}

		.title {
			color: var(--fg);
		}
	}
</style>

<script>
	import Comment from "./Comment.svelte";
	import Loading from "./Loading.svelte";
	import Commentsubmit from "./Commentsubmit.svelte";
	export let id;
	import { onMount } from "svelte";
	let comments = [];
	let token;

	const getComments = async () => {
		comments = [];
		const commentsResp = await fetch(`/api/comments/${id}`);
		comments = comments.concat(await commentsResp.json());
	};
	onMount(async () => {
		getComments();
		token = document.cookie
			.split(";")
			.filter((c) => c.startsWith("token"))[0]
			.split("=")[1];
	});

	let textarea;
</script>

<div class="commentbox">
	<h1 class="title">Comments</h1>
	{#if token != undefined}
		<div class="comment-form">
			<Commentsubmit getComments="{getComments}" id="{id}" />
		</div>
	{/if}
	<div class="comments">
		{#if comments.length > 0}
			{#each comments as { comment }}
				<Comment comment="{comment}" />
			{:else}
				<Loading />
			{/each}
		{/if}
	</div>
</div>
