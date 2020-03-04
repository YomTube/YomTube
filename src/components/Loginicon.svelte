<style type="text/scss" lang="scss">
	#img {
		background-image: var(--img);
		width: 3em;
		height: 3em;
		background-size: cover;
		background-position: center;
		border-radius: 100%;
		cursor: pointer;
		position: relative;
	}

	a {
		text-decoration: none;
		display: block;
		width: 100%;
		height: 100%;
	}

	ul {
		width: 250%;
		z-index: 20;
		perspective: 1000px;
		position: absolute;
		top: 105%;
		left: -150%;
		box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
			0 15px 12px rgba(0, 0, 0, 0.22);
		transition: all 0.3s;
	}

	li {
		display: none;
		width: 100%;
		padding: 0.5em;
		border-bottom: 2px solid var(--accent);
		background-color: white;
		color: black;
		transition-duration: 0.5s;
	}

	li:first-child {
		border-radius: 0.4em 0.4em 0 0;
	}

	li:last-child {
		border-radius: 0 0 0.4em 0.4em;
	}

	@keyframes menu {
		from {
			opacity: 0;
			transform: rotateY(-90deg);
			transform: translate(30);
		}
		to {
			opacity: 1;
			transform: rotateY(0deg);
			transform: translate(0);
		}
	}

	li:hover {
		cursor: pointer;
		background-color: var(--accent);
		color: #ffffff;
	}

	.anim ul li {
		@for $i from 1 through 2 {
			&:nth-child(#{$i}) {
				display: block;
				animation: 300ms * $i menu ease-in-out forwards;
			}
		}
	}

	.anim ul {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
			0 3px 6px rgba(0, 0, 0, 0.23);
	}
</style>

<div
	bind:this="{icon}"
	on:click="{() => menu()}"
	style="--img: {img}; --accent: {accent};"
	id="img">
	<ul>
		<li>
			<a href="/me">My Profile</a>
		</li>
		<li>
			<a on:click="{logout}" href="#">Logout</a>
		</li>
	</ul>
</div>

<script>
	export let img = "url(/stock.jpg)";
	export let accent = "#ffa400";
	let icon;
	const menu = () => {
		icon.classList.toggle("anim");
	};

	const logout = () => {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			let eqPos = cookie.indexOf("=");
			let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie =
				name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
		document.location.href = "/";
	};
</script>
