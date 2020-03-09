<style type="text/scss" lang="scss">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		user-select: none;
	}
	:root {
		--video-width: 100vmin;
		--video-height: calc(var(--video-width) * 9 / 16);
		--bar-height: 3em;
	}
	#videoPlayer {
		width: 100vw;
		height: 100vh;
		max-width: calc(var(--video-width));
		max-height: var(--video-height);
		position: relative;
		overflow: hidden;
	}
	video {
		height: 100%;
		width: 100%;
		background-color: black;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.hasBackground {
		display: flex;
		justify-content: center;
		align-items: center;
		/*
		background-position: center;
		background-size: 70%;
		background-repeat: no-repeat;
		*/
	}
	#spin {
		background-image: url("/icons/loading.svg");
		background-size: cover;
		animation: spin 2s infinite;
		animation-timing-function: ease-in-out;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(90deg);
		}
		50% {
			transform: rotate(180deg);
		}
		75% {
			transform: rotate(270deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	#controls {
		height: 100%;
		width: 100%;

		z-index: 3;

		background-color: #000000aa;

		opacity: 0;

		position: absolute;
		bottom: 0;

		transition: 0.25s opacity;
	}
	#controls.shown {
		transition: 0.25s opacity;
		opacity: 1;
	}
	#bar {
		--bar-height: 0.5em;
		--margin: 1em;
		height: var(--bar-height);
		width: calc(100% - 2 * var(--margin));

		position: absolute;
		bottom: 3em;
		left: var(--margin);

		transition: all 0.25s ease 0s;
	}
	#controls.shown #bar:hover {
		--bar-height: 1em;
	}
	#progress {
		height: 100%;
		width: 100%;

		-webkit-appearance: none;

		position: absolute;
		top: 0;

		z-index: 2;
	}
	input[type="range"]::-ms-thumb,
	input[type="range"]::-moz-range-thumb,
	input[type="range"]::-webkit-slider-thumb,
	input[type="range"]::-webkit-slider-thumb {
		display: none;
	}
	#buffered {
		z-index: 0;
		width: 0%;
		height: 100%;

		background-color: gray;

		position: absolute;
		top: 0;
	}
	#buttons {
		width: 100%;
		height: 3em;

		position: absolute;
		bottom: 0;

		display: flex;
		justify-content: start;
		align-items: center;
	}
	.button {
		height: 3rem;
		width: 3rem;
	}
	#spin,
	#play {
		left: calc(50% - 0.5em);
	}
	#skipForward,
	#skipBackward,
	#spin,
	#play {
		--font-size: 4em;

		font-size: var(--font-size);

		width: 1em;
		height: 1em;
		position: absolute;
		top: calc(50% - 0.5em);
	}
	#skipForward,
	#skipBackward {
		opacity: 0;

		transition: opacity 300ms;
	}

	#skipForward.shown,
	#skipBackward.shown {
		opacity: 1;

		transition: opacity 1.5s;
	}
	#skipForward {
		right: calc(25% - 0.5em);
	}
	#skipBackward {
		left: calc(25% - 0.5em);
	}
	#duration {
		margin: 0 1em;
	}
	#fullscreen {
		margin-left: auto;
	}
	#qualityChooser {
		position: absolute;
		top: 0;
		right: 0;
	}
	#qualities {
		z-index: 0;
		display: none;
		width: 4rem;

		position: absolute;
		top: 0.5em;
		right: calc(var(--bar-height) + 0.5em);

		flex-direction: column;
		justify-content: start;
		align-items: stretch;
	}
	#qualities.shown {
		display: flex;
	}
	.quality {
		color: white;
		display: inline-block;
		background-color: #000000aa;

		padding: 0.1em 0.25em;
		text-align: center;
	}
	.quality.chosen {
		background-color: var(--orange);
		color: black;
	}
	.quality:first-child {
		border-radius: var(--border-radius) var(--border-radius) 0 0;
	}
	.quality:last-child {
		border-radius: 0 0 var(--border-radius) var(--border-radius);
	}
	@media only screen and (min-width: 768px) {
		#volume {
			display: block;
		}
	}
	@media only screen and (orientation: landscape) {
		:root {
			--bar-height: 4em;
		}
		#play {
			display: block;
		}
	}
</style>

<script>
	export let videoJSON;
	export let src;

	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let chosenQuality =
		videoJSON.available_qualities[
			videoJSON.available_qualities.length - 1
		];

	let video = undefined;
	let player = undefined;
	let videoTimer = undefined;
	let barWidth = 0;
	let videoLength = 0;
	let buffered = [];
	let closestBuffer = 0;
	let fullscreenEnabled = false;
	let paused = false;
	let muted = false;
	let volumeValue = 100;
	let currentTime = 0;
	let qualitiesShown = false;
	let timeBeforeChange = undefined;
	let pausedBeforeChange = undefined;
	let bufferWidth = 0;
	let controlHoverTimer = undefined;
	let shown = true;
	let loading = false;
	let isMobile = false;
	let canClick = true;
	let innerWidth, threshold, skippedForward, skippedBackward, skipTimeout;
	let playPromise;

	$: {
		isMobile = innerWidth < 768;
		threshold = innerWidth / 8;
	}

	$: if (video) video.muted = muted;

	$: if (video) video.volume = volumeValue / 100;

	$: if (buffered.length > 0 && buffered.length > closestBuffer) {
		if (video.buffered.length > 0)
			bufferWidth =
				(video.buffered.end(closestBuffer) / videoLength) * 100;
	}

	$: if (buffered.length > 0) findClosestBuffer();

	let setup = () => {
		paused = video.paused;
		videoLength = video.duration;
	};

	let toggleFullscreen = async () => {
		timeBeforeChange = currentTime;
		fullscreenEnabled =
			document.fullscreenEnabled && document.fullscreenElement;
		if (fullscreenEnabled) await document.exitFullscreen();
		else {
			await videoPlayer.requestFullscreen();
		}
		fullscreenEnabled =
			document.fullscreenEnabled && document.fullscreenElement;
	};

	let togglePlaying = async () => {
		if (canClick && shown) {
			try {
				if (paused && video.paused) playPromise = video.play();
				else {
					if (playPromise !== undefined) {
						await playPromise;
						video.pause();
					}
				}
			} catch (err) {
				console.error("Play error:", err);
			}
		}
	};

	let muteVolume = () => (muted = !muted);

	let chooseQuality = async quality => {
		closestBuffer = 0;
		if (playPromise !== undefined && playPromise instanceof Promise) {
			await playPromise;
		}
		pausedBeforeChange = paused;
		timeBeforeChange = currentTime;

		chosenQuality = quality;
		qualitiesShown = false;
		shown = false;
	};

	let findClosestBuffer = ct => {
		let array = [];
		for (let i = 0; i < video.buffered.length; i++) {
			array.push({
				start: video.buffered.start(i),
				end: video.buffered.end(i)
			});
		}
		closestBuffer = array.indexOf(
			array.reduce((prev, curr) => {
				return Math.abs(curr.start - video.currentTime) <
					Math.abs(prev.start - video.currentTime)
					? curr
					: prev;
			})
		);
	};

	let showControls = e => {
		if (e.detail > 1 || qualitiesShown) return;
		if (isMobile && shown) return (shown = false);
		shown = true;
		setTimeout(() => (canClick = true), 250);
		if (controlHoverTimer) clearTimeout(controlHoverTimer);
		if (!qualitiesShown)
			controlHoverTimer = setTimeout(
				() => ((shown = false), (canClick = false)),
				2000
			);
	};

	let skipInVideo = event => {
		let point = event.x - innerWidth / 2;
		let abs = Math.abs(point);
		if (abs > threshold) {
			if (controlHoverTimer) clearTimeout(controlHoverTimer);
			shown = true;
			controlHoverTimer = setTimeout(
				() => ((shown = false), (canClick = false)),
				1500
			);
			currentTime += (10 * point) / abs;
			if (skipTimeout) clearTimeout(skipTimeout);
			point > 0
				? (skippedForward = true)
				: (skippedBackward = true);
			skipTimeout = setTimeout(
				() =>
					point > 0
						? (skippedForward = false)
						: (skippedBackward = false),
				500
			);
		}
	};

	onMount(async () => {
		if (!video.duration) {
			video.addEventListener("loadedmetadata", setup, {
				once: true
			});
		} else setup();
	});
</script>

<svelte:window bind:innerWidth />

<div id="videoPlayer" bind:this="{player}">
	<div
		id="controls"
		on:click="{e => isMobile && showControls(e)}"
		on:mousemove="{e => !isMobile && showControls(e)}"
		on:dblclick="{e => (isMobile ? skipInVideo(e) : toggleFullscreen(e))}"
		class:shown>
		<div id="bar">
			<input
				disabled="{!canClick}"
				id="progress"
				type="range"
				max="{videoLength}"
				bind:value="{currentTime}"
				on:change="{e => {
					buffered.length > 0 ? findClosestBuffer(currentTime) : undefined;
				}}"
				on:input="{async e => {
					if (controlHoverTimer) clearTimeout(controlHoverTimer);
					controlHoverTimer = setTimeout(() => ((shown = false), (canClick = false)), 1500);
					try {
						if (playPromise !== undefined && playPromise instanceof Promise) {
							await playPromise;
						}
						video.pause();
					} catch (videoError) {
						console.error('VideoError', videoError);
					}
					buffered.length > 0 ? findClosestBuffer(currentTime) : undefined;
				}}"
				on:click="{() => (buffered.length > 0 && shown ? findClosestBuffer(currentTime) : undefined)}"
				style="background: linear-gradient(90deg, #ffa000f0 {(currentTime / videoLength) * 100}%,
				rgba(255, 255, 255, 0.1) {(currentTime / videoLength) * 100}%)"
				step="{videoLength / Math.pow(10, 6)}" />
			<div id="buffered" style="width: {bufferWidth}%"></div>
		</div>
		{#if loading}
			<div id="spin"></div>
		{:else}
			<i
				class:shown="{skippedBackward}"
				class="material-icons"
				id="skipBackward">
				skip_previous
			</i>
			<i
				id="play"
				class="button hasBackground material-icons"
				on:click="{togglePlaying}">
				{paused ? 'play_arrow' : 'pause'}
			</i>
			<i
				class:shown="{skippedForward}"
				class="material-icons"
				id="skipForward">
				skip_next
			</i>
		{/if}

		<div id="qualityChooser">
			<i
				class="button hasBackground material-icons"
				on:click="{e => {
					if (!shown) return;
					qualitiesShown = !qualitiesShown;
					if (controlHoverTimer) clearTimeout(controlHoverTimer);
					else if (!qualitiesShown) controlHoverTimer = setTimeout(() => ((shown = false), (canClick = false)), 1500);
				}}">
				settings
			</i>
			<div id="qualities" class:shown="{qualitiesShown}">
				{#each videoJSON.available_qualities as quality}
					<p
						class="quality"
						class:chosen="{chosenQuality == quality}"
						on:click="{() => chooseQuality(quality)}">
						{quality}
					</p>
				{/each}
			</div>
		</div>
		<div id="buttons">
			<!-- <div class="button" id="volume">
				<div
					id="icon"
					class="hasBackground"
					on:click="{muteVolume}"
					style="background-image: url('/icons/{!muted ? 'volume_up' : 'volume_off'}.svg')"></div>
				<input
					type="range"
					bind:value="{volumeValue}"
					on:input="{() => {
						muted ? (muted = !muted) : undefined;
						if (volumeValue === 0) muted = true;
					}}"
					id="innerBar"
					style="background: linear-gradient(90deg,
					#ffa000f0 {volumeValue}%, rgba(255, 255, 255, 0.1)
					{volumeValue}%)" />
			</div> -->
			<p id="duration">
				{new Date(currentTime * 1000)
					.toISOString()
					.substr(14, 5)} / {new Date(videoLength * 1000)
					.toISOString()
					.substr(14, 5)}
			</p>
			<i
				id="fullscreen"
				on:click="{toggleFullscreen}"
				class="button hasBackground material-icons">
				{fullscreenEnabled ? 'fullscreen_exit' : 'fullscreen'}
			</i>
		</div>
	</div>

	<video
		bind:paused
		bind:buffered
		bind:this="{video}"
		bind:currentTime
		preload="metadata"
		on:click="{togglePlaying}"
		on:dblclick="{e => (isMobile ? skipInVideo(e) : toggleFullscreen(e))}"
		on:waiting="{async () => {
			try {
				loading = true;
				if (controlHoverTimer) clearTimeout(controlHoverTimer);
			} catch (videoError) {
				console.log('VideoError', videoError);
			}
		}}"
		on:loadeddata="{async () => {
			if (video.buffered.length > 0) findClosestBuffer();
			timeBeforeChange ? (currentTime = timeBeforeChange) : null;
			if (pausedBeforeChange && !video.paused) {
				try {
					if (playPromise !== undefined) {
						await playPromise;
					}
					video.pause();
				} catch (err) {
					console.error('VideoError', err);
				}
			} else if (!pausedBeforeChange && video.paused) {
				playPromise = video.play();
			}
		}}"
		on:emptied="{() => {
			if (video.buffered.length > 0) findClosestBuffer();
			timeBeforeChange ? (currentTime = timeBeforeChange) : null;
		}}"
		on:seeked="{() => {
			if (loading) {
				if (paused) playPromise = video.play();
				loading = false;
			}
		}}"
		src="{src}/{chosenQuality}"
		type="video/mp4"></video>
</div>
