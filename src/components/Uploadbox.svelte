<style>
	* {
		box-sizing: border-box;
	}

	#container {
		border-radius: 0.4em;
		background-color: var(--bg);
		transition: all 1s;
	}

	.upload-form {
		width: 70vw;
		height: 45vh;
		padding: 100px;
		min-height: 30em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload_icon_container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 8em;
	}

	.upload_dropUpload {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.upload_icon {
		background-image: var(--upload-icon);
		filter: opacity(0.7);
		background-size: contain;
		background-position: center;
		height: 10vh;
		background-repeat: no-repeat;
		width: 100px;
		height: 100px;
		margin-left: 6%;
		cursor: pointer;
		transition: all 0.2s;
	}

	.upload_icon:hover {
		filter: opacity(1);
		transition: all 0.2s;
	}

	.upload_uploading,
	.upload_success,
	.upload_error,
	.upload_dropUpload {
		display: none;
	}

	.upload_button {
		display: none;
	}

	.upload-form.supports-drag-n-drop {
		color: var(--accent1);
		outline-offset: -10px;
	}

	.upload-form.supports-drag-n-drop .upload_dropUpload {
		display: flex;
		flex-direction: column;
	}

	.upload_file {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}

	.hidden {
		display: none !important;
	}

	.file_hover {
		background-color: rgba(101, 224, 255, 0.3);
		animation: breathing 3s ease-in-out infinite normal;
	}

	.file_hover_icon {
		filter: opacity(1);
	}

	.upload_label {
		cursor: pointer;
	}

	.progress_container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: var(--accent1);
		min-height: 8em;
		width: 70vw !important;
	}

	.progress {
		width: 90%;
	}

	@keyframes breathing {
		0% {
			background-color: rgba(101, 224, 255, 0.1);
		}

		25% {
			background-color: rgba(101, 224, 255, 0.3);
		}

		60% {
			background-color: rgba(101, 224, 255, 0.3);
		}

		100% {
			background-color: rgba(101, 224, 255, 0.1);
		}
	}
</style>

<script>
	export let fg;
	export let bg;
	export let accent1;
	export let accent2;
	export let icon;

	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	let isAdvancedUpload = (function() {
		let div = document.createElement("div");
		return (
			("draggable" in div ||
				("ondragstart" in div && "ondrop" in div)) &&
			"FormData" in window &&
			"FileReader" in window
		);
	})();

	let uploadForm;
	let droppedFiles = false;
	let hasHover = false;
	let fileLabel;
	let uploading = false;

	let hoverEventCounter = 0;

	function fileEnter() {
		hoverEventCounter++;
		if (hoverEventCounter > 0) {
			hasHover = true;
		}
	}

	function fileLeave() {
		hoverEventCounter--;
		if (hoverEventCounter <= 0) {
			hasHover = false;
			hoverEventCounter = 0;
		}
	}

	let videoID;
	let fileName;

	console.log("creating request");

	let data = new FormData();

	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function() {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", "/videos/");
	xhr.setRequestHeader(
		"Authorization",
		"Bearer " +
			document.cookie
				.split(";")
				.filter(c => c.startsWith("token"))
				.split("=")[1]
	);
	xhr.setRequestHeader("Content-Type", "multipart/form-data");

	

	function fileDrop(e) {
		fileLeave();

		if (e.dataTransfer.files.length < 1) {
			return;
		}

		fileName = e.dataTransfer.files[0].name;

		data.append("video", fileInput.files[0]);
		data.append("title", fileName);
		xhr.send(data);

		//TODO: fixa så den klagar om man lägger upp flera filer samtidigt

		uploading = true;

		dispatch("filedrop", {
			title: fileName
		});
	}

	function uploaded() {}
</script>

<div
	id="container"
	style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};
	--upload-icon: url({icon})"
>

	<form
		bind:this="{uploadForm}"
		class:supports-drag-n-drop="{isAdvancedUpload}"
		class:file_hover="{hasHover}"
		on:drag|preventDefault|stopPropagation
		on:dragstart|preventDefault|stopPropagation
		on:dragover|preventDefault|stopPropagation
		on:dragenter|preventDefault|stopPropagation="{fileEnter}"
		on:dragleave|preventDefault|stopPropagation="{fileLeave}"
		on:dragend|preventDefault|stopPropagation="{fileLeave}"
		on:drop|preventDefault|stopPropagation="{fileDrop}"
		class:hidden="{uploading}"
		class="upload-form"
		method="POST"
		action=""
		enctype="multipart/form-data"
	>

		<div class="upload_dropUpload">
			<input type="file" id="file" class="upload_file" />

			<div class="upload_icon_container">
				<div
					class="upload_icon"
					class:file_hover_icon="{hasHover}"
					on:click="{fileLabel.click()}"
				></div>
			</div>
			<label for="file" class="upload_label" bind:this="{fileLabel}">
				<h1>Upload video</h1>
				<b>Choose</b>
				or drop a video here
			</label>

			<button class="upload_button">Upload</button>
		</div>
		<div class="upload_uploading" id="upload_uploading">uploading</div>
		<div class="upload_success" id="upload_success">success</div>
		<div class="upload_error" id="upload_error">error</div>
	</form>

	<div class="progress_container" class:hidden="{!uploading}">
		<h1>Uploading</h1>
		<progress class="progress" value="20" max="100"></progress>
	</div>

</div>
