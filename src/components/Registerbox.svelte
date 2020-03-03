<style>
	.registerbox {
		position: absolute;
		width: 100%;
		height: 100%;
		transform: rotateX(180deg);
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
		border-radius: 0.4em 0 0 0.4em;
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
		margin-bottom: 0em;
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
		box-shadow: 0 14px 28px rgba(0, 159, 253, 0.25),
			0 10px 10px rgba(0, 159, 253, 0.22);
	}
	.register {
		text-align: center;
	}
	.register coloure {
		cursor: pointer;
		text-decoration: none;
		color: var(--accent2);
	}
	@media only screen and (max-width: 768px) {
		.registerbox {
			transform: translateX(100%);
			border-radius: 0;
			max-height: initial;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.img {
			display: none;
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
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let fg;
	export let bg;
	export let accent1;
	export let accent2;
	export let img;
	let email = "";
	let username = "";
	let password = "";
	let box;

	export const register = async () => {
		let result = await fetch("/api/users/", {
			body: JSON.stringify({
				email: email,
				username: username,
				password: password
			}),
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let json = await result.json();
		if (result.status != 201) {
			alert(JSON.stringify(json));
		} else {
			document.cookie = `token=${json.token}`;
			window.location.href = "/";
		}
	};
</script>

<div
	bind:this="{box}"
	class="registerbox"
	style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};">
	<div style="background: url({img}) var(--accent2);" class="img"></div>
	<div class="flexwrapper">
		<form class="form" action="">
			<div class="title">
				<h1>Sign up</h1>
			</div>
			<div class="email">
				Email
				<br />
				<input
					bind:value="{email}"
					class="input"
					type="text"
					name="Email"
					placeholder="Email" />
			</div>
			<div class="username">
				Username
				<br />
				<input
					bind:value="{username}"
					class="input"
					type="text"
					name="username"
					placeholder="Username" />
			</div>
			<div>
				Password
				<br />
				<input
					bind:value="{password}"
					class="password input"
					type="password"
					name="password"
					placeholder="Password" />
			</div>
			<div class="submit" style="grid-area: submit;">
				<input
					on:click="{() => register()}"
					class="input"
					type="button"
					value="Register" />
				<p class="register">
					Already have an account?
					<coloure on:click="{() => dispatch('flip')}">
						Sign in
					</coloure>
				</p>
			</div>
		</form>
	</div>
</div>
