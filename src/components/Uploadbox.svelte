<style>
	* {
		box-sizing: border-box;
		overflow-x: hidden;
	}

	#container {
		border-radius: 0.4em;
		background-color: var(--bg);
		width: 100%;
		height: 100%;
	}

	.upload_form {
		width: 100%;
		height: 100%;
		padding: 100px;
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
		transition: opacity 0.2s;
	}

	.upload_icon:hover {
		filter: opacity(1);
		transition: opacity 0.2s;
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

	.upload_form.supports-drag-n-drop {
		color: var(--accent1);
		outline-offset: -10px;
	}

	.upload_form.supports-drag-n-drop .upload_dropUpload {
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
		width: 100% !important;
	}

	progress {
		width: 90%;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		-ms-progress-appearance: none;
		background-color: #eaf6ff;
		border-radius: 100px;
		box-shadow: none;
		border: none;
	}

	progress::-webkit-progress-bar {
		background-color: #eaf6ff;
		border-radius: 100px;
	}

	progress::-webkit-progress-value {
		background-color: var(--orange);
		border-radius: 100px;
	}

	progress::-moz-progress-bar {
		background-color: var(--orange);
		border-radius: 100px;
		box-shadow: none;
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

	@media only screen and (max-width: 768px) {
		#container {
			overflow: hidden;
			width: 100vw;
			border-radius: 0;
		}

		.upload_form {
			width: 100vw;
			height: calc(100vh - 4em);
		}

		.progress_container {
			width: 100vw !important;
			overflow-x: hidden;
		}

		.progress_container > div {
			width: 90vw;
			display: flex;
			align-items: flex-start;
		}
	}
</style>

<script>
	export let fg;
	export let bg;
	export let accent1;
	export let accent2;
	export let icon;
	export let uploadType;
	export let requestType;
	export let requestURL;

	import { createEventDispatcher } from "svelte";
	import { slide } from "svelte/transition";

	const dispatch = createEventDispatcher();

	let isAdvancedUpload = true;

	let uploadForm;
	let droppedFiles = false;
	let hasHover = false;
	let fileLabel;
	let uploading = false;

	let processing = false;

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

	function fileDrop(e) {
		fileLeave();
		console.log(e);

		try {
			if (e.dataTransfer.files.length < 1) {
				return;
			}
		} catch {}

		let data = new FormData();
		let xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function() {
			if (this.readyState === 4) {
				console.log(this.responseText);
				uploaded(this);
			}
		});

		console.log(document.cookie);
		xhr.open(requestType, requestURL);
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
				data.append("file", e.dataTransfer.files[0]);
				fileName = e.dataTransfer.files[0].name;
			}
		} catch {}

		try {
			if (e.srcElement.files[0].name) {
				console.log("clown");
				data.append("file", e.srcElement.files[0]);
				fileName = e.srcElement.files[0].name;
			}
		} catch {}

		data.append("title", fileName);

		xhr.upload.addEventListener("progress", updateProgress);

		xhr.send(data);

		uploading = true;

		dispatch("filedrop", {
			title: fileName
		});
	}

	let progressbar;

	function updateProgress(e) {
		if (e.lengthComputable) {
			progressbar.max = e.total;
			progressbar.value = e.loaded;
			if (e.total == e.loaded) {
				processing = true;
				uploadText.innerText = "Generating thumbnails";
			}
		} else {
			// Unable to compute progress information since the total size is unknown
		}
	}

	let uploadText;

	function uploaded(ue) {
		uploadText.innerText = "Uploaded";
		videoID = JSON.parse(ue.response).video._id;
		dispatch("fileuploaded", {
			videoID: videoID
		});
	}
</script>

<div
	id="container"
	style="--fg: {fg}; --bg: {bg}; --accent1: {accent1}; --accent2: {accent2};
	--upload-icon: url({icon})">

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
		on:click="{fileLabel.click()}"
		class="upload_form"
		method="POST"
		action=""
		enctype="multipart/form-data">

		<div class="upload_dropUpload">
			<input
				type="file"
				id="file"
				class="upload_file"
				accept="video/*"
				on:change="{fileDrop}" />

			<div class="upload_icon_container">
				<div
					class="upload_icon"
					class:file_hover_icon="{hasHover}"></div>
			</div>
			<label
				for="file"
				class="upload_label"
				bind:this="{fileLabel}">
				<h1>Upload {uploadType}</h1>
				<b>Choose</b>
				or drop a {uploadType} here
			</label>

			<button class="upload_button">Upload</button>
		</div>
		<div class="upload_uploading" id="upload_uploading">uploading</div>
		<div class="upload_success" id="upload_success">success</div>
		<div class="upload_error" id="upload_error">error</div>
	</form>

	<div
		class="progress_container"
		class:hidden="{!uploading}"
		transition:slide>
		<div>
			<h1 bind:this="{uploadText}">Uploading</h1>
		</div>
		<progress
			class="progress"
			value="0"
			max="100"
			bind:this="{progressbar}"></progress>
	</div>

</div>
