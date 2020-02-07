<style>
	.flipbox {
		width: 75vw;
		height: 50vh;
		perspective: 1000px;
		max-width: 1200px;
		max-height: 600px;
		min-height: 500px;
	}

	.flipbox-inner {
		will-change: transform;
		transform-style: preserve-3d;
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.4s;
		transform-style: preserve-3d;
	}
	.loginbox {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		max-width: 1200px;
		max-height: 600px;
		min-height: 500px;
		background: var(--bg);
		border-radius: 0.4em;
		box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
			0 15px 12px rgba(0, 0, 0, 0.22);
		display: flex;
	}
	.img {
		width: 45%;
		border-radius: 0 0.4em 0.4em 0;
		background-size: cover;
		background-position: center;
	}

	.flexwrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 55%;
	}

	.form {
		padding: 3em;
		width: 100%;
		color: grey;
		display: flex;
		flex-direction: column;
	}

	.input {
		width: 100%;
		border-radius: 0.5em;
		border: 1px solid grey;
		background: #ffffff;
		height: 3em;
		padding: 0.5em;
		margin-bottom: 1em;
		margin-top: 1em;
	}

	.title {
		color: var(--accent1);
		margin-bottom: 2em;
	}

	.submit {
		width: 75%;
		margin-left: 12.5%;
	}

	.password {
		margin-bottom: 10px;
	}

	.submit input {
		background-color: var(--accent1);
		color: var(--bg);
		font-size: 1.5em;
		border-radius: 0.4em;
		border: 0px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
			0 1px 2px rgba(0, 0, 0, 0.24);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		margin-bottom: 6px;
		appearance: none;
		-webkit-appearance: none;
	}

	.submit input:hover {
		box-shadow: 0 14px 28px rgba(255, 164, 0, 0.25),
			0 10px 10px rgba(255, 164, 0, 0.22);
	}

	.register {
		text-align: center;
	}
	.register coloure {
		cursor: pointer;
		text-decoration: none;
		color: #009ffd;
	}

	.spin {
		transform: rotateX(180deg);
	}
	@media only screen and (max-width: 768px) {
		.img {
			display: none;
		}
		.flipbox {
			width: 100vw;
			height: 100vh;
			overflow: hidden;
			max-height: none;
		}
		.loginbox {
			border-radius: 0;
			max-height: initial;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.flexwrapper {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		.form {
			width: 100%;
			height: 100%;
		}
	}
</style>

<script>
	import Registerbox from "./Registerbox.svelte";
	export let fg;
	export let bg;
	export let accent1;
	export let accent2;
	export let img = "/lowpolyblue.png";
	let identifier;
	let password;
	let flipped;
	let box;

	const login = async () => {
		let result = await fetch(
			`${process.env.BASE_URL}:${process.env.PORT}/api/users/login`,
			{
				body: JSON.stringify({
					identifier: identifier,
					password: password
				}),
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		if (result.status != 201) {
			alert(result.body);
		}
	};
</script>

<div class="flipbox">
	<div class="flipbox-inner" class:spin="{flipped}">
		<div
			bind:this="{box}"
			class="loginbox"
			style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};"
		>
			<div class="flexwrapper">
				<form class="form" action="">
					<div class="title">
						<h1>Login</h1>
					</div>
					<div class="username">
						Username
						<br />
						<input
							bind:value="{identifier}"
							class="input"
							type="text"
							name="username"
							placeholder="Username"
						/>
					</div>
					<div>
						Password
						<br />
						<input
							bind:value="{password}"
							class="password input"
							type="password"
							name="password"
							placeholder="Password"
						/>
						<input type="checkbox" />
						Remember me
					</div>
					<div class="submit" style="grid-area: submit;">
						<input
							on:click="{() => login()}"
							class="input"
							type="button"
							value="Sign in"
						/>
						<p class="register">
							Don't have an account?
							<coloure on:click="{() => (flipped = true)}">
								Sign up
							</coloure>
						</p>
					</div>
				</form>
			</div>
			<div
				style="background: url({img}) var(--accent2);"
				class="img"
			></div>
		</div>
		<Registerbox
			on:flip="{() => (flipped = false)}"
			bg="#ffffff"
			accent1="#009ffd"
			accent2="#ffa400"
			img="/lowpolyorange.png"
		/>
	</div>
</div>
