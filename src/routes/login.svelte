<style>
	#boxbox {
		position: absolute;
		z-index: 3;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #2a2a72;
		overflow: hidden;
	}

	@media only screen and (max-width: 768px) {
		#boxbox {
			overflow: hidden;
			height: 100vh;
		}
	}
</style>

<script>
	import Loginbox from "../components/Loginbox.svelte";
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div id="boxbox">
	<Loginbox
		bg="#ffffff"
		accent1="#ffa400"
		accent2="#009ffd"
		img="/lowpolyblue.png"
		imgtext="Welcome back"
	/>
</div>
