<style>
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		user-select: none;
	}

	:root {
		--width: 70vw;
		--height: calc(var(--width) * 9 / 16);
		--barHeight: 2em;
	}

	#videoPlayer {
		width: var(--width);
		height: var(--height);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:not(:root):fullscreen {
		--height: 100vh;
		--width: 100vw;
	}
	#videoPlayer:fullscreen ~ :root {
		--height: 100vh;
		--width: 100vw;
	}

	video {
		width: var(--width);
		height: auto;
		z-index: 1;
	}

	/* video:hover > #controlContainer {
	display: grid;
} */

	.button {
		width: 4em;
	}

	.button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	#controlContainer {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: var(--width);
		height: calc(2 * var(--barHeight));
		background: rgba(0, 0, 0, 0.6);
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: white;
	}

	#controls {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#playcontrols {
		grid-area: playcontrols;
		height: 100%;
		display: flex;
		justify-content: space-evenly;
	}

	#play {
		line-height: var(--barHeight);
		background-image: url("/play_arrow.svg");
		height: 100%;
	}

	#time {
		grid-area: time;
		width: 8em;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	#progress {
		grid-area: progress;
		position: relative;
		height: 25%;
		width: 100%;
	}

	#bar {
		grid-area: bar;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.1);
	}

	#actualBar {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #ffa400f0;
		width: 0;
		height: 100%;
	}

	#settings {
		grid-area: settings;
		height: 100%;
		display: flex;
		justify-content: space-evenly;
	}

	#settings > * {
		height: 100%;
	}

	#settings > div > p {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#qualityContainer {
		position: relative;
	}

	#qualities {
		position: absolute;
		left: 0;
		width: 100%;
		display: none;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 0.25em;
	}

	#qualities.clicked {
		display: block;
	}

	.quality {
		height: var(--barHeight);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.quality:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.quality#chosen {
		background-color: #ffa400f0;
		color: white;
	}

	#fullscreen {
		background-image: url("/fullscreen.svg");
		height: 100%;
	}

	#quality {
		background-image: url("/settings.svg");
		height: 100%;
	}

	#volumeContainer {
		position: relative;
	}

	#volume {
		position: absolute;
		bottom: 150%;
		left: 25%;
		height: 12em;
		width: 50%;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 0.25em;
		display: none;
		justify-content: end;
		align-items: flex-end;
	}

	#volume #innerBar {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 0.25em;
	}

	#volume.clicked {
		display: flex;
	}

	#volumeIcon {
		position: absolute;
		top: 0;
		left: 0;
		background-image: url("/volume_up.svg");
		height: 100%;
		width: 100%;
	}

	.hasBackground {
		background-repeat: no-repeat;
		background-position: center;
		background-size: 2em;
	}
</style>

<script>
	export let video;
	export let src;
	export let highestSource = video.available_qualities[0];
	import { onMount } from "svelte";

	let videoElement,
		videoPlayer,
		controls,
		playButton,
		fullscreenButton,
		volumeContainer,
		bar,
		actualBar,
		time,
		volumeBar,
		volumeInnerBar,
		currentQuality,
		qualitiesContainer,
		volumeButton,
		qualityButton,
		qualities = video.available_qualities,
		currentTime = 0,
		hasntPlayed = true,
		buffering = false,
		changingSource = false,
		playerInterval,
		hoverTimeout,
		currentQ,
		wasPlaying = true,
		volumeTimer,
		qualitiesContainerClicked = false,
		volumeBarClicked = false;

	onMount(async () => {
		let runPlayer = () => {
			setPlayerInterval();
			videoElement.play();
		};

		let setPlayerInterval = () => {
			clearInterval(playerInterval);
			playerInterval = setInterval(() => {
				if (currentTime + 0.01 <= videoElement.duration) {
					currentTime += 0.01;
					actualBar.style.width =
						(currentTime / videoElement.duration) * 100 + "%";
					setCurrentTime();
				}
			}, 10);
		};

		let setCurrentTime = () =>
			(time.innerHTML = new Date((currentTime + Number.EPSILON) * 1000)
				.toISOString()
				.substr(11, 8));

		let togglePlayer = () => {
			if (videoElement.paused) runPlayer();
			else {
				clearInterval(playerInterval);
				videoElement.pause();
			}
			playButton.style.backgroundImage = `url(./${
				!videoElement.paused ? "pause" : "play_arrow"
			}.svg)`;
		};

		let toggleFullScreen = () => {
			if (document.fullscreenEnabled && document.fullscreenElement)
				document.exitFullscreen();
			else videoPlayer.requestFullscreen();
			fullscreenButton.style.backgroundImage = `url(${
				document.fullscreenEnabled && document.fullscreenElement
					? "fullscreen"
					: "fullscreen_exit"
			}.svg)`;
		};

		let setup = () => {
			playButton.onclick = () => {
				if (hasntPlayed) togglePlayer();
				else {
					currentTime = 0;
					runPlayer();
					hasntPlayed = true;
				}
			};
			bar.onclick = e => {
				let percent = e.offsetX / bar.clientWidth;
				actualBar.style.width = percent * 100 + "%";
				currentTime = videoElement.currentTime =
					percent * videoElement.duration;
				setCurrentTime();
			};
			fullscreenButton.onclick = toggleFullScreen;
			videoElement.ondblclick = toggleFullScreen;
			document.onkeypress = e => {
				switch (e.code) {
					case "KeyF":
						toggleFullScreen();
						break;
					case "Space":
						e.preventDefault();
						togglePlayer();
						break;
				}
			};
			runPlayer();
		};

		if (!videoElement.duration)
			videoElement.addEventListener("loadedmetadata", setup);
		else setup();

		videoElement.onended = () => {
			hasntPlayed = false;
			clearInterval(playerInterval);
		};

		videoElement.onwaiting = e => {
			buffering = true;
			clearInterval(playerInterval);
		};

		videoElement.onplaying = e => {
			if (buffering) {
				buffering = false;
				if (!hasntPlayed) currentTime = 0;

				runPlayer();
			}
		};

		videoElement.onclick = togglePlayer;

		videoPlayer.onmousemove = () => {
			controlContainer.style.display = "flex";
			clearTimeout(hoverTimeout);
			hoverTimeout = setTimeout(() => {
				controlContainer.style.display = "none";
			}, 3000);
		};
		let toggleVolumeSlider = () => {
			volumeBarClicked = !volumeBarClicked;
		};

		volumeContainer.onclick = () => {
			if (volumeBarClicked) {
				if (volumeTimer) clearTimeout(volumeTimer);
				volumeTimer = setTimeout(toggleVolumeSlider, 1000);
			} else toggleVolumeSlider();
		};

		let down = false;

		volumeBar.onmousedown = e => (down = true);
		volumeBar.onmouseup = e => {
			down = false;
			let percent = (videoElement.volume =
				(volumeBar.clientHeight - e.layerY) /
				volumeBar.clientHeight);
			volumeInnerBar.style.height = `${percent * 100}%`;
			if (volumeTimer) clearTimeout(volumeTimer);
			volumeTimer = setTimeout(toggleVolumeSlider, 1000);
			videoElement.volume = percent;
		};
		volumeBar.onmousemove = e => {
			if (down) {
				let percent = (videoElement.volume =
					(volumeBar.clientHeight - e.layerY) /
					volumeBar.clientHeight);
				volumeInnerBar.style.height = `${percent * 100}%`;
				if (volumeTimer) clearTimeout(volumeTimer);
				volumeTimer = setTimeout(toggleVolumeSlider, 1000);
				videoElement.volume = percent;
			}
		};

		let toggleQualitySettings = () =>
			(qualitiesContainerClicked = !qualitiesContainerClicked);
		qualityButton.onclick = toggleQualitySettings;

		qualitiesContainer.style.bottom = `${qualities.length * 16}px`;
	});
	let qualityChange = async quality => {
		if (!changingSource && currentQ !== quality) {
			try {
				currentQuality.id = "";
				changingSource = true;
				wasPlaying = !video.paused;

				await video.pause();

				video.src = source;
				video.currentTime = currentTime;
				currentQ = quality;

				await video.load();
				if (wasPlaying) await video.play();

				changingSource = false;
				qP.id = "chosen";
				currentQuality = qP;
				toggleQualitySettings();
			} catch (err) {
				console.error("Error", err);
			}
		}
	};
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet" />
</svelte:head>

<div id="videoPlayer" bind:this="{videoPlayer}">
	<div id="controlContainer" bind="{controls}">
		<div id="progress">
			<div id="bar" bind:this="{bar}">
				<div id="actualBar" bind:this="{actualBar}"></div>
			</div>
		</div>
		<div id="controls">
			<div id="playcontrols">
				<div
					id="play"
					class="button hasBackground"
					bind:this="{playButton}"></div>
				<div
					id="volumeContainer"
					class="button"
					bind:this="{volumeContainer}">
					<div
						id="volume"
						class:clicked="{volumeBarClicked}"
						bind:this="{volumeBar}">
						<div
							id="innerBar"
							bind:this="{volumeInnerBar}"></div>
					</div>
					<div
						id="volumeIcon"
						class="hasBackground"
						bind:this="{volumeButton}"></div>
				</div>
				<div id="time" bind:this="{time}"></div>
			</div>
			<div id="settings">
				<div
					id="qualityContainer"
					class="button"
					bind:this="{qualityButton}">
					<div
						id="qualities"
						class:clicked="{qualitiesContainerClicked}"
						bind:this="{qualitiesContainer}">
						{#each video.available_qualities as quality}
							<p
								class="quality"
								on:click="{qualityChange(quality)}">
								{quality}p
							</p>
						{/each}
					</div>
					<div
						id="quality"
						class="hasBackground"
						bind:this="{currentQuality}"></div>
				</div>
				<div
					id="fullscreen"
					class="button hasBackground"
					bind:this="{fullscreenButton}"></div>
			</div>
		</div>
	</div>
	<video bind:this="{videoElement}" autoplay>
		<source src="{src}/{highestSource}" type="video/mp4" />
	</video>
</div>
