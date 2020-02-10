<style type="text/scss" lang="scss">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		user-select: none;
	}

	:root {
		--video-width: 70vw;
		--video-height: calc(var(--video-width) * 9 / 16);

		--bar-height: calc(var(--video-height) * 0.08);
	}

	#videoPlayer {
		width: var(--video-width);
		height: var(--video-height);

		position: relative;
	}

	video {
		height: 100%;
		width: 100%;

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

	#controls {
		width: 100%;
		height: var(--bar-height);

		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.8);

		display: grid;
		grid-template-areas: "progress" "buttons";
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 7fr;

		#progress {
			width: 100%;
			height: 100%;
			grid-area: progress;
			background-color: rgba(255, 255, 255, 0.1);
			transition: all 0.1s ease-in-out;
			position: relative;
			margin-top: 0;
			bottom: 0;
			left: 0;

			&:hover {
				height: 200%;
			}

			#innerBar {
				width: 0;
				height: 100%;
				background-color: #ffa000f0;
			}
		}

		#buttons {
			--buttons-height: calc(var(--bar-height) * 7 / 8);
			width: 100%;
			height: var(--buttons-height);
			grid-area: buttons;
			display: flex;
			justify-content: space-between;
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
					display: flex;
					transition: all 0.25s ease-in-out;

					#icon {
						width: var(--buttons-height);
						height: 100%;
						display: block;
					}

					#innerBar {
						position: relative;
						display: none;
						width: 100%;
						justify-self: center;
						align-self: center;
						height: 15%;
						border-radius: var(--buttons-height);
						outline: none;
						-webkit-appearance: none;

						&::-webkit-slider-thumb {
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

						&::-moz-range-thumb {
							background: white;
							height: calc(var(--buttons-height) * 0.15);
							width: calc(var(--buttons-height) * 0.15);
							cursor: pointer;
							border-radius: calc(
								var(--buttons-height) * 0.15
							);
						}
					}

					&:hover {
						width: calc(3 * var(--buttons-height));
						#innerBar {
							display: block;
							max-width: calc(2 * var(--buttons-height));
						}
					}
				}
				#fullscreen {
					background-image: url("/fullscreen.svg");
				}
			}
		}
	}
</style>

<script>
	export let videoJSON;
	export let src;
	export let highestSource = videoJSON.available_qualities[0];
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let video = undefined;
	let player = undefined;
	let barWidth = 0;
	let videoLength = 0;
	let fullscreenEnabled = false;
	let playing = true;
	let muted = false;
	let volumeValue = 100;
	let currentTime = { video };

	$: if (video) {
		video.volume = volumeValue / 100;
	}

	let setup = () => {
		// Scrubba i video tack
		// setInterval(() => {
		// 	barWidth = video.currentTime;
		// }, 50);
		videoLength = video.duration * 20;
	};

	let toggleFullscreen = async () => {
		// så dehär borde inte funka
		// but it do
		fullscreenEnabled =
			document.fullscreenEnabled && document.fullscreenElement;
		if (fullscreenEnabled) await document.exitFullscreen();
		else {
			await videoPlayer.requestFullscreen();
		}
		fullscreenEnabled =
			document.fullscreenEnabled && document.fullscreenElement;
	};

	let togglePlaying = () => {
		if (video.paused) video.play();
		else video.pause();
		playing = !playing;
	};

	let muteVolume = () => {
		muted = video.muted = !video.muted;
	};

	onMount(async () => {
		if (!video.duration) video.onloadedmetadata = setup;
		else setup();
	});
</script>

<div id="videoPlayer" bind:this="{player}">
	<div id="controls">
		<input
			id="progress"
			type="range"
			max="{videoLength}"
			bind:value="{currentTime}" />
		<!-- <div id="progress">
			<div id="innerBar" style="width: {barWidth}%;"></div>
		</div> -->
		<div id="buttons">
			<div id="left">
				<div
					id="play"
					class="hasBackground"
					on:click="{togglePlaying}"
					style="background-image: url('/{!playing ? 'play' : 'pause'}.svg')"></div>
				<div id="volume">
					<div
						id="icon"
						class="hasBackground"
						on:click="{muteVolume}"
						style="background-image: url('/{!muted ? 'volume_up' : 'volume_off'}.svg')"></div>
					<input
						type="range"
						bind:value="{volumeValue}"
						id="innerBar"
						style="background: linear-gradient(90deg, white {volumeValue}%,
						rgba(255, 255, 255, 0.1) {volumeValue}%)" />
				</div>
			</div>
			<div id="right">
				<div
					id="fullscreen"
					on:click="{toggleFullscreen}"
					class="hasBackground"
					style="background-image: url('/{fullscreenEnabled ? 'fullscreen_exit' : 'fullscreen'}.svg');"></div>
			</div>
		</div>
	</div>
	<video
		bind:this="{video}"
		poster="{src}/thumbnail"
		preload="metadata"
		on:click="{togglePlaying}"
		autoplay>
		<source src="{src}/{highestSource}" type="video/mp4" />
	</video>
</div>
