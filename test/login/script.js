const username = document.querySelector("input[type=text]");
const email = document.querySelector("input[type=email]");
const password = document.querySelector("input[type=password]");
const status = document.querySelector("div#output #status");
const outputText = document.querySelector("div#output #text");

let login = () => {
	fetch(`/users/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: username.value,
			email: email.value,
			password: password.value
		})
	})
		.then(async resp => {
			status.innerHTML = `${resp.status} - ${resp.statusText}`;
			outputText.innerHTML = resp;
			if (!resp.ok) throw await resp.json();
			return resp.json();
		})
		.then(resp => {
			outputText.innerHTML = JSON.stringify(resp, null, 4);
			document.cookie = `token=${resp.token}`;
			status.style.color = "black";
		})
		.catch(error => {
			outputText.innerHTML = JSON.stringify(error, null, 4);
			status.style.color = "red";
		});
};

let register = () => {
	fetch(`/users/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: username.value,
			email: email.value,
			password: password.value
		})
	})
		.then(async resp => {
			status.innerHTML = `${resp.status} - ${resp.statusText}`;
			outputText.innerHTML = resp;
			if (!resp.ok) throw await resp.json();
			return resp.json();
		})
		.then(resp => {
			outputText.innerHTML = JSON.stringify(resp, null, 4);
			document.cookie = `token=${resp.token}`;
			status.style.color = "black";
		})
		.catch(error => {
			outputText.innerHTML = JSON.stringify(error, null, 4);
			status.style.color = "red";
		});
};

let me = () => {
	if (document.cookie.length == 0) return console.log("Not logged in");
	let token = document.cookie
		.split(";")
		.filter(cookie => cookie.startsWith("token"))[0]
		.split("=")[1];

	fetch(`/users/me`, {
		headers: {
			Authorization: "Bearer " + token
		}
	})
		.then(async resp => {
			status.innerHTML = `${resp.status} - ${resp.statusText}`;
			outputText.innerHTML = resp;
			if (!resp.ok) throw await resp.json();
			return resp.json();
		})
		.then(resp => {
			outputText.innerHTML = JSON.stringify(resp, null, 4);
			status.style.color = "black";
		})
		.catch(error => {
			outputText.innerHTML = JSON.stringify(error, null, 4);
			status.style.color = "red";
		});
};

let logout = () => {
	if (document.cookie.length == 0) return console.log("Not logged in");
	let token = document.cookie
		.split(";")
		.filter(cookie => cookie.startsWith("token"))[0]
		.split("=")[1];
	fetch(`/users/logout`, {
		headers: {
			Authorization: "Bearer " + token
		}
	})
		.then(async resp => {
			status.innerHTML = `${resp.status} - ${resp.statusText}`;
			outputText.innerHTML = resp;
			if (!resp.ok) throw await resp.json();
			return resp.text();
		})
		.then(resp => {
			document.cookie = "";
			outputText.innerHTML = resp;
			status.style.color = "black";
		})
		.catch(error => {
			outputText.innerHTML = JSON.stringify(error, null, 4);
			status.style.color = "red";
		});
};
let logoutAll = () => {
	if (document.cookie.length == 0) return console.log("Not logged in");
	let token = document.cookie
		.split(";")
		.filter(cookie => cookie.startsWith("token"))[0]
		.split("=")[1];
	fetch(`/users/logout/all`, {
		headers: {
			Authorization: "Bearer " + token
		}
	})
		.then(async resp => {
			status.innerHTML = `${resp.status} - ${resp.statusText}`;
			outputText.innerHTML = resp;
			if (!resp.ok) throw await resp.json();
			return resp.text();
		})
		.then(resp => {
			document.cookie = "";
			outputText.innerHTML = resp;
			status.style.color = "black";
		})
		.catch(error => {
			outputText.innerHTML = JSON.stringify(error, null, 4);
			status.style.color = "red";
		});
};
