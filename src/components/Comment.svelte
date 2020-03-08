<style>
	.comment {
		display: flex;
		width: 100%;
		height: 5rem;
		margin-top: 1em;
		padding: 1em;
		background-color: var(--fg);
		border-radius: var(--border-radius);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
			0 1px 2px rgba(0, 0, 0, 0.24);
	}

	.profilepicture {
		width: auto;
		height: 100%;
		border-radius: 100%;
	}

	.comment-content {
		width: 90%;
		height: 100%;
		margin-left: 0.7em;
		display: flex;
		flex-direction: column;
	}

	.comment-title {
		display: flex;
		align-items: center;
		font-size: 1rem;
	}

	.text {
		font-size: 1rem;
	}

	.username {
		font-weight: bold;
	}

	.date {
		color: #606060;
	}
</style>

<script>
	export let comment;
</script>

<div class="comment">
	<img
		class="profilepicture"
		src="data:{comment.user.profilePicture.type};base64, {comment.user.profilePicture.data}"
		alt="" />
	<div class="comment-content">
		<div class="comment-title">
			<p class="username">{comment.user.username}</p>
			<p class="date">‎ ‎• {comment.created_at.substring(0, 10)}</p>
		</div>
		<p class="text">{comment.text}</p>
	</div>
</div>
