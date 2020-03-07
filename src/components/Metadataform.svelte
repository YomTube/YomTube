<style>
	#conatiner {
		background-color: var(--bg);
		border-radius: 0.4em;
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 3em;
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
		padding-top: 1em;
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
		margin: 1em 0;
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
		background-color: hotpink;
		width: 1.5em;
		height: 1.5em;
	}

	@media only screen and (max-width: 768px) {
		#conatiner {
			overflow: hidden;
			width: 100%;
			border-radius: 0;
			margin-top: 0;
		}

		form {
			width: 90%;
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

	let customThumbnail;
	let selectedThumbnail = 1;
	let previousThumb = 1;
	let thumbUploading = false;
	let thumbnailFileElement;
	let thumbnailWaiting = false;
	let waitingThumbnailEvent;
	let metadataWaiting = false;

	// let videoDescription = "";
	let descriptionTextarea;
	let titleInput;

	let thumbnailDiv1;
	let thumbnailDiv2;
	let thumbnailDiv3;

	let test = false;

	import Button from "../components/Button.svelte";
	let thumbnail1;
	let thumbnail2;
	let thumbnail3;

	$: {
		thumbnail1 = "/api/videos/" + videoID + "/thumbnail/1";
		if (thumbnailWaiting) {
			console.log("thumbWaiting");
			uploadThumb(waitingThumbnailEvent);
			console.log("thumb uploading bingbong");
		}
		if (metadataWaiting) {
			submitForm();
		}
	}
	$: thumbnail2 = "/api/videos/" + videoID + "/thumbnail/2";
	$: thumbnail3 = "/api/videos/" + videoID + "/thumbnail/3";

	console.log(videoID);
	if (videoID) {
		console.log("video id true");
	} else {
		console.log("video id false");
	}

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
					console.log("clown");
					data.append("file", e.srcElement.files[0]);
					// data.append("primaryThumbnail", 0);
					console.log(e.srcElement.files[0]);
				}
			} catch {}

			xhr.upload.addEventListener("load", transferComplete);
			xhr.upload.addEventListener("error", uploadError);
			xhr.send(data);
		} else {
			thumbnailWaiting = true;
			waitingThumbnailEvent = e;
			console.log(waitingThumbnailEvent);
		}
	}

	let thumbnailProgressPercentage;

	function transferComplete() {
		console.log("thumb uploaded");
		selectedThumbnail = 0;
		thumbUploading = false;
	}

	function uploading() {
		previousThumb = selectedThumbnail;
		selectedThumbnail = 0;
		thumbUploading = true;
	}

	function uploadError() {
		console.log("thumbnail upload failed");
		thumbUploading = false;
		selectedThumbnail = previousThumb;
	}

	function submitForm() {
		console.log("submitform");

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
		};
	}
</script>

<div
	id="conatiner"
	style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};
	--upload-icon: url({icon}); --thumbnail1: url({thumbnail1}) --thumbnail2:
	url({thumbnail2}; --thumbnail3: url({thumbnail3}">

	<form action="">
		<h1>{message}</h1>
		<label for="title">Title</label>
		<input
			id="title"
			type="text"
			class="textfield"
			bind:this="{titleInput}"
			value="{videotitle}" />
		<label for="description">Description</label>
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
				on:change="{uploadThumb}"
				accept="image/*" />
			<label
				for="thumbnailFileElement"
				class="upload_thumbnail thumbnail"
				bind:this="{customThumbnail}"
				class:thumbSelected="{selectedThumbnail == 0}"
				class:breathingBorder="{thumbUploading}">
				<div class="changeThumb upload_thumbnail"></div>
			</label>
			<div
				class="thumbnail"
				style="background-image: url({thumbnail1});"
				bind:this="{thumbnailDiv1}"
				class:thumbSelected="{selectedThumbnail == 1}"
				on:click="{() => (selectedThumbnail = 1)}"></div>
			<div
				class="thumbnail"
				style="background-image: url({thumbnail2});"
				bind:this="{thumbnailDiv2}"
				class:thumbSelected="{selectedThumbnail == 2}"
				on:click="{() => (selectedThumbnail = 2)}"></div>
			<div
				class="thumbnail last_thumbnail"
				style="background-image: url({thumbnail3});"
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
						foreground="#FFA400" />
			</div>
		</div>
	</form>

</div>
