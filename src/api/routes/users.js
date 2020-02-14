import express from "express";

import auth from "../middleware/auth";

import User from "../../models/user";
const router = express.Router();

// Register
router.post("/", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		const token = await user.genJWTToken();
		res.status(201).send({ token });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Login
router.get("/", async (req, res) => {
	try {
		const { identifier, password } = req.body;
		const user = await User.findUser(identifier, password);
		if (!user) return res.status(401).send("Login failed.");
		const token = await user.genJWTToken();
		res.send({ token });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Get current user
router.get("/me", auth, (req, res) => {
	res.send(req.user);
});

// Get other user
router.get('/username/:username', (req, res) => {
	let user = req.params.username;
	res.send(user)
})

// Logout of current session
router.get("/me/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			obj => obj.token != req.token
		);
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send(error);
	}
});

// Logout of all sessions
router.get("/me/logout/all", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send(error);
	}
});

export default router;
