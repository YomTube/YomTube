<style>
	a {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 0.4em;
		display: block;
		background-image: var(--thumbnail);
		background-size: 100% calc(100% - 2em);
		background-repeat: no-repeat;
		background-position: initial;
		text-decoration: none;
		transition: all 0.3s;
	}

	a:hover {
		box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
			0 15px 12px rgba(0, 0, 0, 0.22);
	}

	div {
		height: 2em;
		border-bottom-left-radius: 0.4em;
		border-bottom-right-radius: 0.4em;
		padding-left: 0.5em;
		width: 100%;
		position: relative;
		top: calc(100% - 2em);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 80%;
		color: #232528;
		background-color: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
			0 1px 2px rgba(0, 0, 0, 0.24);
	}

	span {
		width: calc(20% - 2em);
		position: relative;
		margin: 1em;
		margin-bottom: 2em;
		display: inline-block;
	}

	span:after {
		padding-top: 60%;
		/* 16:9 ratio */
		display: block;
		content: "";
	}

	@media only screen and (max-width: 1500px) {
		span {
			width: calc(25% - 2em);
		}
		div {
			font-size: 1em;
		}
	}

	@media only screen and (max-width: 1000px) {
		span {
			width: calc(33% - 2em);
		}
		div {
			font-size: 1em;
		}
	}

	@media only screen and (max-width: 768px) {
		span {
			width: 100%;
		}
		div {
			font-size: 1em;
		}
	}
</style>

<script>
	export let id;
	export let thumbnail = "url(/linus.jpg)";
	export let title;
</script>

<span>
	<a style="--thumbnail: {thumbnail};" href="/videos/{id}">
		<div>
			<p>{title}</p>
		</div>
	</a>
</span>
