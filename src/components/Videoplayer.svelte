<style>
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		user-select: none;
	}

	:root {
		--width: 70vmax;
		--height: calc(var(--width) * 9 / 16);
		--barHeight: 3em;
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

	video:hover > #controls {
		display: grid;
	}

	.button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	#controls {
		position: absolute;
		top: calc(var(--height) - var(--barHeight));
		left: 0;
		z-index: 2;
		width: var(--width);
		height: var(--barHeight);
		background: rgba(0, 0, 0, 0.6);
		display: none;
		align-items: center;
		grid-template-columns: 1fr 11fr 2fr; /*calc(2 * var(--barHeight)) 1fr calc(
				4 * var(--barHeight)
			); */
		grid-template-rows: 1fr;
		grid-template-areas: "playcontrols progress settings";
		text-align: center;
		color: white;
	}

	#controls > * {
		justify-content: center;
		align-items: center;
		height: var(--barHeight);
	}

	#playcontrols {
		grid-area: playcontrols;
		width: 100%;
		height: var(--barHeight);
	}

	#progress {
		grid-area: progress;
		position: relative;
		height: var(--barHeight);
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 5fr; /*calc(2 * var(--barHeight)) 1fr;*/
		grid-template-rows: 1fr;
		grid-template-areas: "time bar";
	}

	#time {
		grid-area: time;
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
		background-color: rgba(255, 255, 255, 0.8);
		width: 0;
		height: 100%;
	}

	#settings {
		grid-area: settings;
		height: var(--barHeight);
		width: calc(4 * var(--barHeight));
		display: flex;
		justify-content: space-evenly;
	}

	#settings > * {
		height: 100%;
		width: 100%;
	}

	#settings > div > p {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#quality {
		position: relative;
	}

	#quality:hover #qualities {
		display: block;
	}

	#qualities {
		position: absolute;
		left: 0;
		width: 100%;
		display: none;
		background-color: rgba(0, 0, 0, 0.6);
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
	/* 
	@media only screen and (max-width: 1500px) {
	}

	@media only screen and (max-width: 1000px) {
	} */

	@media only screen and (max-width: 768px) and (orientation: portrait) {
		:root {
			--width: 100vw;
			--height: calc(var(--width) * 9 / 16);
			--barheight: 2em;
		}
	}
</style>

<script>
	export let video;
	export let src;
	export let highestSource = video.available_qualities[0];
	import { onMount } from "svelte";

	console.log(JSON.stringify(video));

	let videoElement,
		videoPlayer,
		controls,
		playButton,
		fullscreenButton,
		bar,
		actualBar,
		time,
		currentQuality,
		qualitiesContainer,
		qualities = video.available_qualities,
		currentTime = 0,
		hasntPlayed = true,
		buffering = false,
		changingSource = false,
		playerInterval,
		hoverTimeout,
		currentQ,
		wasPlaying = true;

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
			playButton.innerHTML = !videoElement.paused
				? "pause"
				: "play_arrow";
		};

		let toggleFullScreen = () => {
			if (document.fullscreenEnabled && document.fullscreenElement)
				document.exitFullscreen();
			else videoPlayer.requestFullscreen();
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
						togglePlayer();
						break;
				}
			};
			if (wasPlaying) {
				runPlayer();
			}
		};

		if (!videoElement.duration)
			videoElement.addEventListener("loadedmetadata", setup);
		else setup();

		videoElement.onended = () => {
			clearInterval(playerInterval);
			hasntPlayed = false;
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
			controls.style.display = "grid";
			clearTimeout(hoverTimeout);
			hoverTimeout = setTimeout(() => {
				controls.style.display = "none";
			}, 3000);
		};

		qualitiesContainer.style.top = `-${qualities.length * 100}%`;
		currentQuality.innerHTML = highestSource + "p";
	});
	let qualityChange = async quality => {
		if (!changingSource && currentQ !== quality) {
			try {
				changingSource = true;
				wasPlaying = !videoElement.paused;

				await videoElement.pause();

				videoElement.src = `${src}/${quality}`;
				videoElement.currentTime = currentTime;
				currentQ = quality;

				await videoElement.load();

				changingSource = false;
				currentQuality.innerHTML = quality + "p";
			} catch (err) {
				console.error("Error", err);
			}
		}
	};
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
	/>
</svelte:head>

<div id="videoPlayer" bind:this="{videoPlayer}">
	<div id="controls" bind:this="{controls}">
		<i
			id="playcontrols"
			class="button material-icons"
			bind:this="{playButton}"
		>
			pause
		</i>
		<div id="progress">
			<div id="time" bind:this="{time}"></div>
			<div id="bar" bind:this="{bar}">
				<div id="actualBar" bind:this="{actualBar}"></div>
			</div>
		</div>
		<div id="settings">
			<div id="quality" class="button">
				<div id="qualities" bind:this="{qualitiesContainer}">
					{#each video.available_qualities as quality}
						<p
							class="quality"
							on:click="{qualityChange(quality)}"
						>
							{quality}p
						</p>
					{/each}
				</div>
				<p id="currentQuality" bind:this="{currentQuality}"></p>
			</div>
			<div
				id="fullscreen"
				class="button"
				bind:this="{fullscreenButton}"
			>
				<p>Fullscreen</p>
			</div>
		</div>
	</div>
	<video bind:this="{videoElement}" autoplay>
		<source src="{src}/{highestSource}" type="video/mp4" />
	</video>
</div>
