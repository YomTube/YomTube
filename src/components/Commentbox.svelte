<style>
	* {
		box-sizing: border-box;
	}
	.commentbox {
		background-color: var(--fg);
		margin-top: 1em;
		padding: 1em;
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
	import Commentsubmit from "./Commentsubmit.svelte";
	export let id;
	import { onMount } from "svelte";
	let comments = [];
	onMount(async () => {
		const commentsResp = await fetch(`/api/comments/${id}`);
		comments = comments.concat(await commentsResp.json());
		console.log(comments);
	});

	let textarea;
</script>

<div class="commentbox">
	<h1 class="title">Comments</h1>
	<div class="comment-form">
		<Commentsubmit {id} />
	</div>
	<div class="comments">
		{#if comments != undefined}
			{#each comments as { comment }}
				<Comment {comment} />
			{/each}
		{/if}
	</div>
</div>
