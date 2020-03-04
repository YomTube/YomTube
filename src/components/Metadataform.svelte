<style>
	#conatiner {
		background-color: var(--bg);
		border-radius: 0.4em;
		width: 70vw;
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

	.hidden {
		display: none !important;
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
		/* justify-content: center; */
	}

	.thumbnail {
		background-color: purple;
		width: calc(16 * 0.35em);
		height: calc(9 * 0.35em);
		margin-right: 0.3em;
		border-radius: 0.2em;
		background-size: cover;
	}

	.thumbnail:hover {
		cursor: pointer;
	}

	.thumbnail_1 {
		background-image: var(--thumbnail1);
	}

	.upload_thumbnail {
		background-color: orange !important;
		/* background-color: #00000000 !important; */
		background-image: var(--upload-icon);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		/* background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%) !important; */
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

	/* .thumbnailProgress {
		background-color: aqua;
		width: 100%;
		height: 100%; */
		/* z-index: -1000; */
		/* border-radius: 0.2em;
		top: 0;
		left: 0;
		position: relative;
	} */

	.thumbSelected {
		/* outline: 0.2em solid lime; */
		box-shadow: 0 0 0 0.15em var(--accent2);
	}

	.breathingBorder {
		animation: breathing 3s infinite ease-in-out normal;
	}

	.changeThumb{
		position: relative;
		top: calc(100% - 1.6em);
		left: calc(100% - 1.6em);
		border-radius: .4em;
		background-color: hotpink;
		width: 1.5em;
		height: 1.5em;
	}

	@media only screen and (max-width: 768px) {
		#conatiner {
			overflow: hidden;
			width: 100vw;
			border-radius: 0;
			margin-top: 0;
		}

		form {
			width: 90%;
		}
	}

	@keyframes breathing{
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
	export let visible;
	export let videoID;

	let customThumbnail;
	let selectedThumbnail = 1;
	let previousThumb = 1;
	let thumbUploading = false;

	// let thumbnail1 = "/api/videos/" + videoID + "/thumbnail";

	import Button from "../components/Button.svelte";
	// const dispatch = createEventDispatcher();
	let thumbnail1;

	$: thumbnail1 = "/api/videos/" + videoID + "/thumbnail";

	// TODO: se till att denhär gör rätt
	function uploadThumb(e) {
		console.log(e);

		let data = new FormData();
		let xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		// xhr.open("POST", "/api/videos/{videoID}/customThumbnail");
		xhr.open("POST", "/api/videos/");
		xhr.setRequestHeader(
			"Authorization",
			"Bearer " +
				document.cookie
					.split(";")
					.filter(c => c.startsWith("token"))[0]
					.split("=")[1]
		);

		try {
			if (e.dataTransfer.files[0].name) {
				console.log("bingbong");
				// data.append("thumbnail", e.dataTransfer.files[0]);
				data.append("video", e.dataTransfer.files[0]);
			}
		} catch {}

		try {
			if (e.srcElement.files[0].name) {
				console.log("clown");
				// data.append("thumbnail", e.srcElement.files[0]);
				data.append("video", e.srcElement.files[0]);
				data.append("title", "yeet");
			}
		} catch {}

		xhr.upload.addEventListener("progress", updateProgress);
		xhr.upload.addEventListener("load", transferComplete);
		xhr.upload.addEventListener("loadstart", uploading);
		xhr.upload.addEventListener("error", uploadError);
		xhr.send(data);
	}

	let thumbnailProgressPercentage;

	function updateProgress(e) {
		// console.log(e.loaded);
		if (e.lengthComputable) {
			thumbnailProgressPercentage = (e.loaded / e.total) * 100;
			console.log(thumbnailProgressPercentage);
			customThumbnail.style =
				"background: linear-gradient(90deg, rgba(255,164,0,1) 0%, rgba(255,164,0,1) " +
				thumbnailProgressPercentage +
				"%, rgba(0,159,253,1) " +
				thumbnailProgressPercentage +
				"%, rgba(0,159,253,1) 100%) !important;";
			// progressbar.max = e.total;
			// progressbar.value = e.loaded;
			// progressbar.value = (e.loaded / e.total) * 100;
			console.log(customThumbnail.style.background);
		} else {
			// Unable to compute progress information since the total size is unknown
		}
	}

	function transferComplete() {
		customThumbnail.removeAttribute("style");
		selectedThumbnail = 0;
		thumbUploading = false;
		customThumbnail.style = "background-image: url(/api/videos/" + videoID + "/customThumbnail"; //TODO: byta till rätt url
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

	function submitForm() {}

	function test() {
		alert(1);
	}
</script>

<div
	id="conatiner"
	style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};
	--upload-icon: url({icon}); --thumbnail1: url({thumbnail1})"
	class:hidden="{!visible}">

	<form action="">
		<h1>{message}</h1>
		<label for="title">Title</label>
		<input
			id="title"
			type="text"
			class="textfield"
			value="{videotitle}" />
		<label for="description">Description</label>
		<!-- <input id="description" type="text" class="textfield" /> -->
		<textarea
			name="description"
			id="description"
			class="textfield"
			style="height: 9em; max-width: 100%; min-width: 100%; min-height:
			3em;"></textarea>

		<b>Thumbnail</b>
		<div class="thumbnail_container">
			<!-- <img src="http://yomtube.z:3000/api/videos/{videoID}/thumbnail" alt=""> -->
			<!-- <div class="upload_thumbnail thumbnail" on:click="{uploadThumb}"></div> -->
			<input
				type="file"
				class="upload_file"
				id="thumbnailFileElement"
				on:change="{uploadThumb}" />
			<label
				for="thumbnailFileElement"
				class="upload_thumbnail thumbnail"
				bind:this="{customThumbnail}"
				class:thumbSelected="{selectedThumbnail == 0}"
				class:breathingBorder="{thumbUploading}"
				>
				<div class="changeThumb upload_thumbnail"></div>
				<!-- <div class=""></div> -->
				<!-- <div class="thumbnailProgress"></div> -->
			</label>
			<div
				class="thumbnail_1 thumbnail"
				class:thumbSelected="{selectedThumbnail == 1}"
				on:click="{() => selectedThumbnail = 1}"></div>
			<div
				class="thumbnail_2 thumbnail"
				class:thumbSelected="{selectedThumbnail == 2}"
				on:click="{() => selectedThumbnail = 2}"
				></div>
			<div
				class="thumbnail_3 thumbnail"
				class:thumbSelected="{selectedThumbnail == 3}" 
				on:click="{() => selectedThumbnail = 3}"></div>
		</div>

		<div class="buttonContainer">
			<!-- <button class="button">Save</button> -->
			<div class="buttonContainerContainer">
				<Button
					text="Save"
					background="white"
					foreground="#FFA400" />
			</div>
		</div>
	</form>

</div>
