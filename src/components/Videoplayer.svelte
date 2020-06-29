<style type="text/scss" lang="scss">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
	:root {
		--video-width: 100vmin;
		--video-height: calc(var(--video-width) * 9 / 16);

		--bar-size: 3rem;
		--bar-height: 0.75rem;
		--margin: 1rem;
	}
	#videoPlayer {
		height: 100vh;
		max-width: calc(var(--video-width));
		min-width: 98vw;
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
	}
	#spin-container {
		width: 100%;
		height: 100%;

		position: absolute;
		top: 0;
		left: 0;

		z-index: 16;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	#spin {
		font-size: 2em;
		width: 2em;
		height: 2em;

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

		position: relative;
		bottom: 0;
		padding: 0.5rem;

		transition: 0.25s opacity;
	}
	#controls.shown {
		transition: 0.25s opacity;
		opacity: 1;
	}
	#bar {
		height: var(--bar-height);
		width: calc(100% - 2 * var(--margin));
		margin: 0.25em 0;

		position: absolute;
		bottom: var(--bar-size);
		left: var(--margin);

		transition: all 0.25s ease 0s;
	}
	#controls.shown #bar:hover {
		height: calc(2 * var(--bar-height));
	}
	#progress {
		height: 100%;
		width: 100%;

		appearance: none;
		-webkit-appearance: none;

		position: absolute;
		top: 0;

		z-index: 2;
	}

	/*
	#progress::-moz-range-thumb,
	#progress::-webkit-slider-thumb {
		appearance: none;
		-webkit-appearance: none;
		background-color: var(--orange);
		border-radius: 100%;
		height: var(--bar-height);
		width: var(--bar-height);
	}
	*/
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: var(--bar-height);
		width: var(--bar-height);
		background: transparent;
		cursor: pointer;
	}

	input[type="range"]::-moz-range-thumb {
		-moz-appearance: none;
		height: var(--bar-height);
		width: var(--bar-height);
		background: transparent;
		cursor: pointer;
	}

	input[type="range"]::-ms-thumb {
		height: var(--bar-height);
		width: var(--bar-height);
		background: transparent;
		cursor: pointer;
	}
	#buffered {
		z-index: 0;
		width: 0%;
		height: 100%;

		background-color: gray;

		position: absolute;
		top: 0;
	}
	#play {
		left: calc(50% - 0.5em);
	}
	#skipForward,
	#skipBackward,
	#play {
		font-size: 4em;

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
	}
	#skipForward {
		right: calc(25% - 0.5em);
	}
	#skipBackward {
		left: calc(25% - 0.5em);
	}
	.atBottom {
		position: absolute;
		bottom: 0 !important;
		top: unset !important;

		height: var(--bar-size);
	}
	.button i,
	.button {
		width: var(--bar-size);
		height: var(--bar-size);
	}
	#duration {
		height: var(--bar-size);
		left: 1rem;
		line-height: var(--bar-size);
	}
	#fullscreen {
		right: 0;
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
		right: var(--bar-size);

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
		font-size: unset;
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
		:root {
			--video-width: 60vw;
		}
		#videoPlayer {
			min-width: 768px;
			min-height: 432px;
		}
		#controls {
			--control-height: calc(
				var(--bar-size) + 2 * var(--bar-height)
			);
			height: var(--control-height);

			display: block;

			opacity: 1;

			position: absolute;
			bottom: calc(-1 * var(--control-height));
			transition: bottom 0.25s ease !important;
		}
		#controls.shown {
			bottom: 0;
		}
		#controls.shown #bar:hover {
			/* height: calc(2 * var(--bar-height)) !important;*/
			height: var(--bar-height);
		}
		/*
		 #controls.shown #bar:hover {
		 	--bar-height: 1em;
		 	height: var(--bar-height) !important;
		 }
		 */
		#volume {
			display: flex;
			justify-content: start;
			align-items: center;

			overflow: hidden;

			width: var(--bar-size);
			height: var(--bar-size);

			left: var(--bar-size);
			transition: width 0.25s ease;
		}
		#volume i {
			width: 100%;
			min-width: var(--bar-size);
			max-width: var(--bar-size);
			height: var(--bar-size);
		}
		#volume input {
			width: calc(1.8 * var(--bar-size));
		}
		#volume:hover {
			width: calc(3 * var(--bar-size));
		}
		#volume:hover ~ #duration {
			left: calc(4 * var(--bar-size));
		}
		i {
			font-size: 2em !important;
		}
		#qualityChooser {
			right: var(--bar-size);
		}
		#play {
			left: 0;
		}
		#duration {
			transition: left 0.25s ease;
			left: calc(2 * var(--bar-size));
		}
		#qualities {
			top: unset;
			bottom: calc(3 * var(--bar-height) + var(--bar-size));
			right: 0;
			/* TODO Centrera ^ */
		}
		#spin-container {
			background-color: #000000aa;

			z-index: 2;
		}
	}
</style>

<script>
	export let videoJSON;
	export let src;

	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let { available_qualities } = videoJSON;
	// videoJSON.available_qualities.length - 1

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
	let shown;
	let loading = false;
	let isMobile = false;
	let canClick;
	let innerWidth,
		innerHeight,
		threshold,
		skippedForward,
		skippedBackward,
		skipTimeout;
	let playPromise;
	let hasRunSetup = false;

	let chosenQuality = available_qualities[available_qualities.length - 1];

	// TODO Global shown handler
	// doesnt start timer when changing qualities sometimes
	// Rarely on actual mobile
	// rework

	// TODO qualities should hide if clicking outsite the box

	// TODO on mobile you can click on the range without it showing

	$: if (!fullscreenEnabled) {
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

	let setup = async () => {
		paused = video.paused;
		videoLength = video.duration;
		try {
			playPromise = video.play();
			await playPromise;
			console.log("Could autoplay!");
			shown = false;
			canClick = false;
		} catch (err) {
			console.log("Couldn't autoplay!");
			shown = true;
			canClick = true;
		}
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
		if (isMobile) {
			if (canClick && shown) {
				try {
					if (paused && video.paused)
						playPromise = video.play();
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
		} else {
			try {
				if (paused && video.paused) playPromise = video.play();
				else {
					if (playPromise !== undefined) {
						await playPromise;
						video.pause();
					}
				}
				resetShowTimer();
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
		resetShowTimer();
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
		console.log("Hovering");
		if (isMobile && shown) {
			shown = false;
			canClick = false;
		} else {
			resetShowTimer();
		}
	};

	let skipInVideo = event => {
		let point = event.x - innerWidth / 2;
		let abs = Math.abs(point);
		if (abs > threshold) {
			resetShowTimer();
			currentTime += (10 * point) / abs;
			if (skipTimeout) clearTimeout(skipTimeout);
			point > 0
				? ((skippedForward = true), (skippedBackward = false))
				: ((skippedBackward = true), (skippedForward = false));
			skipTimeout = setTimeout(
				() =>
					point > 0
						? (skippedForward = false)
						: (skippedBackward = false),
				1000
			);
		}
	};

	let clearShowTimer = () => {
		if (controlHoverTimer) clearTimeout(controlHoverTimer);
	};

	let show = () => {
		shown = true;
		setTimeout(() => (canClick = true), 250);
	};

	let setShowTimer = () => {
		if (!qualitiesShown)
			controlHoverTimer = setTimeout(
				() => ((shown = false), (canClick = false)),
				1500
			);
	};

	let resetShowTimer = () => {
		clearShowTimer();
		show();
		setShowTimer();
	};

	onMount(async () => {
		chosenQuality =
			available_qualities[
				available_qualities.indexOf(
					available_qualities.reduce((previous, current) =>
						Math.abs(current - innerHeight) <
						Math.abs(previous - innerHeight)
							? current
							: previous
					)
				)
			];
		if (!video.duration) {
			video.addEventListener("loadedmetadata", setup, {
				once: true
			});
		} else setup();
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div id="videoPlayer" bind:this="{player}">
	{#if loading}
		<div id="spin-container">
			<div id="spin"></div>
		</div>
	{/if}
	<div
		id="controls"
		on:click="{e => isMobile && showControls(e)}"
		on:mousemove="{e => !isMobile && showControls(e)}"
		on:dblclick="{e => (isMobile ? skipInVideo(e) : toggleFullscreen(e))}"
		class:shown="{(isMobile && (loading || shown)) || (!isMobile && shown)}">
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
					resetShowTimer();
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
		<i
			class:shown="{skippedBackward}"
			class="material-icons"
			id="skipBackward">
			skip_previous
		</i>
		{#if (isMobile && !loading) || !isMobile}
			<i
				id="play"
				class="button hasBackground material-icons"
				class:atBottom="{!isMobile}"
				on:click="{togglePlaying}">
				{paused ? 'play_arrow' : 'pause'}
			</i>
		{/if}
		<i
			class:shown="{skippedForward}"
			class="material-icons"
			id="skipForward">
			skip_next
		</i>

		<div
			id="qualityChooser"
			class="button"
			class:atBottom="{!isMobile}">
			<i
				class="hasBackground material-icons"
				on:click="{e => {
					if (!shown) return;
					qualitiesShown = !qualitiesShown;
					resetShowTimer();
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
		{#if !isMobile}
			<div class="button atBottom" id="volume">
				<i
					id="icon"
					class="hasBackground material-icons"
					on:click="{muteVolume}">
					{!muted ? 'volume_up' : 'volume_off'}
				</i>
				<input
					type="range"
					bind:value="{volumeValue}"
					on:mouse
					on:input="{() => {
						resetShowTimer();
						muted ? (muted = !muted) : undefined;
						if (volumeValue === 0) muted = true;
					}}"
					id="innerBar"
					style="background: linear-gradient(90deg,
					#ffa000f0 {volumeValue}%, rgba(255, 255, 255, 0.1)
					{volumeValue}%)" />
			</div>
		{/if}
		<p id="duration" class="atBottom">
			{new Date(currentTime * 1000).toISOString().substr(14, 5)} / {new Date(
				videoLength * 1000
			)
				.toISOString()
				.substr(14, 5)}
		</p>
		<i
			id="fullscreen"
			on:click="{toggleFullscreen}"
			class="button hasBackground material-icons atBottom">
			{fullscreenEnabled ? 'fullscreen_exit' : 'fullscreen'}
		</i>
	</div>

	<video
		bind:paused
		bind:buffered
		bind:this="{video}"
		bind:currentTime
		controls="{false}"
		preload="metadata"
		on:mousemove="{e => !isMobile && showControls(e)}"
		on:click="{togglePlaying}"
		on:dblclick="{e => (isMobile ? skipInVideo(e) : toggleFullscreen(e))}"
		on:playing="{() => {
			loading = false;
			setShowTimer();
		}}"
		on:waiting="{async () => {
			try {
				loading = true;
				clearShowTimer();
				show();
			} catch (videoError) {
				console.log('VideoError', videoError);
			}
		}}"
		on:loadeddata="{async () => {
			if (video.buffered.length > 0) findClosestBuffer();
			timeBeforeChange ? (currentTime = timeBeforeChange) : null;
			if (pausedBeforeChange == true && !video.paused) {
				try {
					if (playPromise !== undefined) {
						await playPromise;
					}
					video.pause();
				} catch (err) {
					console.error('VideoError', err);
				}
			} else if (pausedBeforeChange == false && video.paused) {
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
