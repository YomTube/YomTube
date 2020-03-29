<style>
	.commentsubmit {
		display: flex;
		align-items: center;
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

	.textbox {
		width: 95%;
		height: 100%;
		margin: 0 1em;
		border-bottom: 1px solid #606060;
		transition: all 0.3s linear;
	}

	.submit {
		display: none;
	}

	.textbox input {
		width: 100%;
		height: 100%;
		border: none;
	}

	.textbox input:placeholder {
		color: #606060;
	}

	.textbox:after {
		content: "";
		display: block;
		width: 0;
		border-bottom: 2px solid var(--orange);
		transition: all 0.2s linear;
	}

	.focus {
		width: 85%;
	}

	.focus:after {
		width: 100%;
	}

	.focus + .submit {
		display: block;
	}
</style>

<script>
	import { onMount } from "svelte";
	import Button from "./Button.svelte";
	let textbox;
	let mime;
	export let id;
	export let getComments;
	let img;
	let focus = false;

	const focustoggle = () => {
		console.log("toggle");
		focus = !focus;
	};

	const submit = async () => {
		let cookies = document.cookie;
		let token = cookies
			.split(";")
			.filter(c => c.startsWith("token"))[0]
			.split("=")[1];
		console.log(id);
		let resp = await fetch(`/api/comments/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify({
				text: textbox.value
			})
		});
		getComments();
	};

	onMount(async () => {
		let cookies = document.cookie;
		let token = cookies
			.split(";")
			.filter(c => c.startsWith("token"))[0]
			.split("=")[1];

		let resp = await fetch("/api/users/me", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		let json = await resp.json();
		mime = json.user.profilePicture.contentType;
		img = json.user.profilePicture.data;
	});
</script>

<div class="commentsubmit">
	<img class="profilepicture" src="data:{mime};base64, {img}" alt="" />
	<div class:focus class="textbox">
		<input
			on:click="{focustoggle}"
			type="text"
			bind:this="{textbox}"
			placeholder="Add a comment" />
	</div>
	<div class="submit" on:click="{() => submit()}">
		<Button
			text="{'Submit'}"
			onclick="{submit}"
			foreground="{'#009ffd'}"
			background="{'#ffffff'}" />
	</div>

</div>
