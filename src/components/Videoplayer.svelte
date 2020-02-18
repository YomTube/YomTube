<style type="text/scss" lang="scss">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		user-select: none;
	}

	:root {
		--video-height: 70vh;
		--video-width: calc(var(--video-height) * 16 / 9);

		--bar-height: calc(var(--video-height) * 0.1);
	}

	#videoPlayer {
		width: var(--video-width);
		height: var(--video-height);

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
		background-position: center;
		background-size: 70%;
		background-repeat: no-repeat;
	}

	#spinner {
		width: 100%;
		height: 100%;
		z-index: 2;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		&.hidden {
			display: none;
		}
		#spin {
			width: 20vh;
			height: 20vh;
			background-image: url("/loading.svg");
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
	}

	#controls {
		width: 100%;
		height: var(--bar-height);

		position: absolute;
		bottom: calc(-1 * var(--bar-height));
		left: 0;
		z-index: 3;

		transition: all 0.5s;

		&.hovering {
			bottom: 0;
		}

		#bar {
			width: 100%;
			height: 12.5%;
			margin: 0;
			padding: 0;
			grid-area: bar;
			background-color: rgba(0, 0, 0, 0.8);
			position: absolute;
			bottom: 87.5%;
			transition: all 0.5s;

			&:hover {
				height: 25%;
			}

			#progress {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 3;
				left: 0;
				-webkit-appearance: none;
				appearance: none;
				outline: none;
				&::-webkit-slider-thumb {
					-webkit-appearance: none;
					appearance: none;
					height: 8px;
					width: 8px;
					background: white;
					cursor: drag;
				}

				&::-moz-range-thumb {
					margin-left: 0px;
					background: white;
					height: 8px;
					width: 8px;
					cursor: drag;
				}
			}

			#buffered {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 2;
				background-color: rgba(255, 255, 255, 0.3);
			}
		}

		#buttons {
			--buttons-height: calc(var(--bar-height) * 7 / 8);
			width: 100%;
			height: var(--buttons-height);
			position: absolute;
			top: 12.5%;
			grid-area: buttons;
			display: flex;
			justify-content: space-between;

			background-color: rgba(0, 0, 0, 0.8);
			align-items: center;
			> div {
				height: 100%;
				display: flex;
				justify-content: start;
				align-items: center;
				> div {
					height: 100%;
					width: var(--buttons-height);
				}

				#play {
					background-image: url("/play_arrow.svg");
				}
				#volume {
					position: relative;
					transition: all 0.45s ease-in-out;
					overflow: hidden;

					#icon {
						position: absolute;
						top: 0;
						left: 0;
						width: var(--buttons-height);
						height: 100%;
						display: block;
						overflow: hidden;
					}

					#innerBar {
						position: absolute;
						top: 42.5%;
						left: var(--buttons-height);
						width: calc(2 * var(--buttons-height));
						align-self: center;
						height: 15%;
						border-radius: var(--buttons-height);
						outline: none;
						-webkit-appearance: none;

						&::-webkit-slider-thumb,
						&::-moz-range-thumb {
							-webkit-appearance: none;
							appearance: none;
							height: calc(var(--buttons-height) * 0.15);
							width: calc(var(--buttons-height) * 0.15);
							background: white;
							cursor: pointer;
							border-radius: calc(
								var(--buttons-height) * 0.15
							);
						}
					}

					&:hover {
						width: calc(3 * var(--buttons-height));
					}
				}
				#fullscreen {
					background-image: url("/fullscreen.svg");
				}

				#qualityChooser {
					position: relative;
					#icon {
						position: absolute;
						top: 0;
						left: 0;
						background-image: url("/settings.svg");
						width: 100%;
						height: 100%;
					}

					#qualities {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						width: 100%;
						position: absolute;
						bottom: 150%;
						left: 0;
						border-radius: 0.25em;
						background-color: rgba(0, 0, 0, 0.8);
						.quality {
							height: 100%;
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 0.5vh 0;
							&:first-child {
								border-radius: 0.25em 0.25em 0 0;
							}
							&:last-child {
								border-radius: 0 0 0.25em 0.25em;
							}
							&.chosen {
								background-color: #ffa000f0;
								color: black;
							}

							&:hover {
								background-color: rgba(
									255,
									255,
									255,
									0.8
								);
								color: black;
							}
						}

						&.hidden {
							display: none;
						}
					}
				}
			}
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
	let qualitiesHidden = true;
	let timeBeforeChange = undefined;
	let pausedBeforeChange = undefined;
	let bufferWidth = 0;
	let controlHoverTimer = undefined;
	let hovering = false;
	let loading = false;

	$: if (video) video.muted = muted;

	$: if (video) video.volume = volumeValue / 100;
	$: if (buffered.length > 0 && buffered.length > closestBuffer) {
		bufferWidth = (video.buffered.end(closestBuffer) / videoLength) * 100;
	}

	$: if (buffered.length > 0) findClosestBuffer();

	let setup = () => {
		paused = video.paused;
		videoLength = video.duration;
	};

	let toggleFullscreen = async () => {
		// så dehär borde inte funka
		// but it do
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

	let togglePlaying = () => (paused ? video.play() : video.pause());

	let muteVolume = () => (muted = !muted);

	let chooseQuality = quality => {
		closestBuffer = 0;
		pausedBeforeChange = paused;
		timeBeforeChange = currentTime;
		chosenQuality = quality;
		qualitiesHidden = !qualitiesHidden;
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

	let hoveringControls = () => {
		hovering = true;
		if (controlHoverTimer) clearTimeout(controlHoverTimer);
		if (qualitiesHidden)
			controlHoverTimer = setTimeout(() => (hovering = false), 3000);
	};

	onMount(async () => {
		if (!video.duration) {
			video.addEventListener("loadedmetadata", setup, {
				once: true
			});
		} else setup();
	});
</script>

<div id="videoPlayer" bind:this="{player}">
	<div id="controls" on:mousemove="{hoveringControls}" class:hovering>
		<div id="bar">
			<input
				id="progress"
				type="range"
				max="{videoLength}"
				bind:value="{currentTime}"
				on:change="{() => (buffered.length > 0 ? findClosestBuffer(currentTime) : undefined)}"
				on:input="{() => (buffered.length > 0 ? findClosestBuffer(currentTime) : undefined)}"
				on:click="{() => (buffered.length > 0 ? findClosestBuffer(currentTime) : undefined)}"
				style="background: linear-gradient(90deg, #ffa000f0 {(currentTime / videoLength) * 100}%,
				rgba(255, 255, 255, 0.1) {(currentTime / videoLength) * 100}%)" />
			<div id="buffered" style="width: {bufferWidth}%"></div>
		</div>

		<div id="buttons">
			<div id="left">
				<div
					id="play"
					class="hasBackground"
					on:click="{togglePlaying}"
					style="background-image: url('/{paused ? 'play' : 'pause'}.svg')"></div>
				<div id="volume">
					<div
						id="icon"
						class="hasBackground"
						on:click="{muteVolume}"
						style="background-image: url('/{!muted ? 'volume_up' : 'volume_off'}.svg')"></div>
					<input
						type="range"
						bind:value="{volumeValue}"
						on:input="{() => {
							muted ? (muted = !muted) : undefined;
							if (volumeValue === 0) muted = true;
						}}"
						id="innerBar"
						style="background: linear-gradient(90deg,
						#loadingffa000f0 {volumeValue}%, rgba(255, 255,
						255, 0.1) {volumeValue}%)" />
				</div>
			</div>
			<div id="right">
				<div id="qualityChooser">
					<div
						id="icon"
						class="hasBackground"
						on:click="{() => (qualitiesHidden = !qualitiesHidden)}"></div>
					<div id="qualities" class:hidden="{qualitiesHidden}">
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
				<div
					id="fullscreen"
					on:click="{toggleFullscreen}"
					class="hasBackground"
					style="background-image: url('/{fullscreenEnabled ? 'fullscreen_exit' : 'fullscreen'}.svg');"></div>
			</div>
		</div>
	</div>
	<div
		id="spinner"
		class:hidden="{!loading}"
		on:mousemove="{hoveringControls}">
		<div id="spin"></div>
	</div>
	<video
		bind:paused
		bind:buffered
		bind:this="{video}"
		bind:currentTime
		preload="metadata"
		on:click="{togglePlaying}"
		on:playing="{() => (loading = false)}"
		on:waiting="{() => (loading = true)}"
		on:emptied="{() => {
			if (video.buffered.length > 0) findClosestBuffer();
			timeBeforeChange ? (currentTime = timeBeforeChange) : null;
		}}"
		on:mousemove="{hoveringControls}"
		src="{src}/{chosenQuality}"
		type="video/mp4"
		autoplay></video>
</div>
