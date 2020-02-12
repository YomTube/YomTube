<style>
	#img {
		background-image: var(--img);
		width: 3em;
		height: 3em;
		background-size: cover;
		background-position: center;
		border-radius: 100%;
	}

	ul {
		height: 0px;
		width: 10%;
		overflow: hidden;
		
	}

	li {
		display: block;
		transition-duration: 0.5s;
	}

	li:hover {
		cursor: pointer;
	}
</style>

<script>
	export let img = "url(/stock.jpg)";
</script>

<div style="--img: {img};" id="img">
	<ul>
		<li>
			<a href="/me">My Profile</a>
		</li>
	</ul>
</div>
