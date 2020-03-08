<style>
	.search {
		width: 100%;
		height: 100%;
		padding: 0.5em;
		border: 0px;
		border-radius: 0.3em 0 0 0.3em;
	}
	.searchwrapper {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
			0 3px 6px rgba(0, 0, 0, 0.23);
		margin: auto;
		border-radius: 0.3em;
		width: 40%;
		height: 65%;
		display: flex;
		overflow: hidden;
	}
	.searchbutton {
		height: 100%;
		width: 4em;
		background-color: var(--orange);
		color: white;
		border: none;
		border-radius: 0 0.3em 0.3em 0;
		background-size: 65%;
		background-repeat: no-repeat;
		background-position: center;
		cursor: pointer;
	}

	.backbutton {
		display: none;
		height: 100%;
		width: 4em;
		color: var(--lightblue);
		background-color: white;
		border: none;
		cursor: pointer;
	}

	@media only screen and (max-width: 768px) {
		.search {
			width: 0%;
			padding: 0;
		}

		.searchwrapper {
			width: 2.5em;
			height: 32px;
			margin-right: 0em;
			margin-left: auto;
			box-shadow: none;
		}

		.searchbutton {
			border-radius: 100%;
			height: 38.4px;
			width: 38.4px;
			color: var(--orange);
			font-size: 1.5em;
			background-color: transparent;
		}
		.fullwidth {
			width: 100%;
			position: absolute;
			height: 4em;
			z-index: 10;
			left: 0;
			top: 0;
			border-radius: 0px;
			box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
				0 3px 6px rgba(0, 0, 0, 0.23);
		}

		.widesearch {
			padding: 0.5em;
			height: 100%;
			width: calc(100% - 4em);
			border-radius: 0px;
		}
		.mobilebutton {
			border-radius: 0px;
			display: block;
		}
		.wide {
			width: 2em;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;
		}
	}
</style>

<script>
	let wide = false;

	const toggle = () => {
		wide = !wide;
	};
</script>

<div class:fullwidth="{wide}" class="searchwrapper">
	<button
		class="backbutton"
		class:mobilebutton="{wide}"
		on:click="{toggle}">
		<i class="material-icons">arrow_back</i>
	</button>
	<input
		class:widesearch="{wide}"
		placeholder="Search"
		class="search"
		type="text" />
	<button
		class="searchbutton"
		class:mobilebutton="{wide}"
		class:wide
		on:click="{toggle}">
		<i class="material-icons">search</i>
	</button>
</div>
