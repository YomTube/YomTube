<style>
	#conatiner {
		background-color: var(--bg);
		border-radius: 0.4em;
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 3em 0;
	}

	.textfield {
		width: 100%;
		border-radius: 0.5em;
		border: 1px solid grey;
		background: #ffffff;
		height: 3em;
		padding: 0.5em;
		margin-bottom: 1em;
		margin-top: 0.2em;
	}

	label {
		color: black;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 50%;
		color: #000000;
	}

	h1 {
		color: var(--accent1);
		padding-bottom: 0.3em;
	}

	.thumbnail_container {
		display: flex;
		flex-direction: row;
	}

	.thumbnail_container > label {
		background-size: contain !important;
		background-repeat: no-repeat;
	}

	.thumbnail {
		background-color: purple;
		width: calc(16 * 0.35em);
		height: calc(9 * 0.35em);
		margin-right: 0.3em;
		border-radius: 0.2em;
		background-size: cover;
		background-position: center;
	}

	.last_thumbnail {
		margin-right: 0;
	}

	.thumbnail:hover {
		cursor: pointer;
	}

	.upload_thumbnail {
		background-color: orange;
		background-image: var(--upload-icon);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.buttonContainerContainer {
		margin-top: 1em;
	}

	.upload_file {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}

	.thumbSelected {
		box-shadow: 0 0 0 0.15em var(--accent2);
	}

	.breathingBorder {
		animation: breathing 3s infinite ease-in-out normal;
	}

	.changeThumb {
		position: relative;
		top: calc(100% - 1.6em);
		left: calc(100% - 1.6em);
		border-radius: 0.4em;
		width: 1.5em;
		height: 1.5em;
	}

	.hidden {
		display: none;
	}

	@media only screen and (max-width: 768px) {
		#conatiner {
			overflow: hidden;
			width: 100%;
			border-radius: 0;
			margin-top: 0;
			padding: 0;
		}

		form {
			width: 90%;
		}
	}

	@media only screen and (max-width: 1300px) and (min-width: 769px) {
		form {
			width: 450px;
		}
	}

	@keyframes breathing {
		0% {
			box-shadow: 0 0 0 0.15em rgba(0, 159, 253, 0.3);
		}

		50% {
			box-shadow: 0 0 0 0.15em rgba(0, 159, 253, 0.95);
		}

		100% {
			box-shadow: 0 0 0 0.15em rgba(0, 159, 253, 0.3);
		}
	}
</style>

<script>
	export let fg;
	export let bg;
	export let accent1;
	export let accent2;
	export let icon;
	export let message;

	export let videotitle;
	export let videoID;
	export let description;

	let customThumbnail;
	export let selectedThumbnail = 1;
	let previousThumb = 1;
	let thumbUploading = false;
	let thumbnailFileElement;
	let thumbnailWaiting = false;
	let waitingThumbnailEvent;
	let metadataWaiting = false;
	export let hasCustomThumbnail = false;

	let buttonColor = "#FFA400";

	let descriptionTextarea;
	let titleInput;

	let thumbnailFileLabel;

	let thumbnailDiv1;
	let thumbnailDiv2;
	let thumbnailDiv3;

	import Button from "../components/Button.svelte";

	import { onMount } from "svelte";

	$: if (videoID) {
		if (thumbnailWaiting) {
			uploadThumb(waitingThumbnailEvent);
		}
		if (metadataWaiting) {
			submitForm();
		}
	}

	onMount(() => {
		if (description) {
			descriptionTextarea.value = description;
		}

		if (hasCustomThumbnail) {
			customThumbnail.style =
				"background-image: url(/api/videos/" +
				videoID +
				"/thumbnail/0); background-color: #000000;";
		}
	});

	function uploadThumb(e) {
		previewThumb();
		thumbUploading = true;
		previousThumb = selectedThumbnail;
		selectedThumbnail = 0;

		if (videoID) {
			thumbnailWaiting = false;

			let data = new FormData();
			let xhr = new XMLHttpRequest();
			xhr.withCredentials = true;

			xhr.open("PATCH", `/api/videos/${videoID}`);
			xhr.setRequestHeader(
				"Authorization",
				"Bearer " +
					document.cookie
						.split(";")
						.filter(c => c.startsWith("token"))[0]
						.split("=")[1]
			);

			try {
				if (e.srcElement.files[0].name) {
					data.append("file", e.srcElement.files[0]);
				}
			} catch {}

			xhr.upload.addEventListener("error", uploadError);
			xhr.addEventListener("load", transferComplete);
			xhr.send(data);
		} else {
			thumbnailWaiting = true;
			waitingThumbnailEvent = e;
		}
	}

	let thumbnailProgressPercentage;

	function transferComplete() {
		selectedThumbnail = 0;
		thumbUploading = false;
	}

	function uploading() {
		previousThumb = selectedThumbnail;
		selectedThumbnail = 0;
		thumbUploading = true;
	}

	function uploadError() {
		thumbUploading = false;
		selectedThumbnail = previousThumb;
	}

	function submitForm() {
		buttonColor = "var(--darkblue)";

		if (videoID) {
			let data = new FormData();
			let xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.open("PATCH", `/api/videos/${videoID}`);
			xhr.setRequestHeader(
				"Authorization",
				"Bearer " +
					document.cookie
						.split(";")
						.filter(c => c.startsWith("token"))[0]
						.split("=")[1]
			);

			data.append("primaryThumbnail", selectedThumbnail);
			data.append("title", titleInput.value);
			data.append("description", descriptionTextarea.value);
			data.append("published", true);

			xhr.addEventListener("load", function() {
				buttonColor = "green";
				setTimeout(function() {
					buttonColor = "var(--orange)";
				}, 3000);
			});

			xhr.send(data);

			metadataWaiting = false;
		} else {
			metadataWaiting = true;
		}
	}

	function previewThumb() {
		const reader = new FileReader();
		reader.readAsDataURL(thumbnailFileElement.files[0]);
		reader.onload = e => {
			customThumbnail.style =
				"background-image: url(" +
				reader.result +
				"); background-color: #000000;";
			hasCustomThumbnail = true;
		};
	}

	function customThumbnailClickHandler() {
		if (hasCustomThumbnail) {
			selectedThumbnail = 0;
		} else {
			thumbnailFileLabel.click();
		}
	}
</script>

<div
	id="conatiner"
	style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};
	--upload-icon: url({icon});">

	<form>
		<h1>{message}</h1>
		<label for="title">
			<b>Title</b>
		</label>
		<input
			id="title"
			type="text"
			class="textfield"
			bind:this="{titleInput}"
			value="{videotitle}" />
		<label for="description">
			<b>Description</b>
		</label>
		<textarea
			name="description"
			id="description"
			class="textfield"
			bind:this="{descriptionTextarea}"
			style="height: 9em; max-width: 100%; min-width: 100%;
			min-height: 3em;"></textarea>

		<b>Thumbnail</b>
		<div class="thumbnail_container">
			<input
				type="file"
				class="upload_file"
				bind:this="{thumbnailFileElement}"
				id="thumbnailFileElement"
				accept="image/*"
				on:change="{uploadThumb}" />
			<label
				for="thumbnailFileElement"
				class="upload_file"
				bind:this="{thumbnailFileLabel}"></label>
			<div
				class="upload_thumbnail thumbnail"
				bind:this="{customThumbnail}"
				on:click="{customThumbnailClickHandler}"
				class:thumbSelected="{selectedThumbnail == 0}"
				class:breathingBorder="{thumbUploading}">
				<div
					class="changeThumb upload_thumbnail"
					on:click="{() => thumbnailFileLabel.click()}"
					class:hidden="{!hasCustomThumbnail}"></div>
			</div>

			<div
				class="thumbnail"
				style="background-image: {videoID ? `url(/api/videos/${videoID}/thumbnail/1)` : undefined};"
				bind:this="{thumbnailDiv1}"
				class:thumbSelected="{selectedThumbnail == 1}"
				on:click="{() => (selectedThumbnail = 1)}"></div>
			<div
				class="thumbnail"
				style="background-image: {videoID ? `url(/api/videos/${videoID}/thumbnail/2)` : undefined};"
				bind:this="{thumbnailDiv2}"
				class:thumbSelected="{selectedThumbnail == 2}"
				on:click="{() => (selectedThumbnail = 2)}"></div>
			<div
				class="thumbnail last_thumbnail"
				style="background-image: {videoID ? `url(/api/videos/${videoID}/thumbnail/3)` : undefined};"
				bind:this="{thumbnailDiv3}"
				class:thumbSelected="{selectedThumbnail == 3}"
				on:click="{() => (selectedThumbnail = 3)}"></div>
		</div>

		<div class="buttonContainer">
			<div class="buttonContainerContainer">
				<Button
					onclick="{submitForm}"
					text="Save"
					background="white"
					foreground="{buttonColor}" />
			</div>
		</div>
	</form>

</div>
