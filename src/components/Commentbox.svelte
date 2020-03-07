<style>
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
</style>

<!-- <script context="module">
	export async function preload(page) {
		const videoID = page.params.video;

		const commentsResp = await fetch(`/api/comments/${videoID}`);
		const comments = await commentsResp.json();

		console.log(comments, videoID);

		return { comments, videoID };
	}
</script> -->

<div class="commentbox">
	<h1 class="title">Comments</h1>
	<div class="comment-form">
		<!-- <textarea bind:this="{textarea}" name="" id=""></textarea> -->
	</div>
	<div class="comments">
		<!-- {#each comments as { comment }}
			<div class="comment">{comment.text}</div>
		{/each} -->
	</div>
</div>
