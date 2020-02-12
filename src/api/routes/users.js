import express from "express";

import auth from "../middleware/auth";

import { User } from "../../models/index.js";
const router = express.Router();

// Register
router.post("/", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		const token = await user.genJWTToken();
		res.status(201).send({ user, token });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Login
router.post("/login", async (req, res) => {
	try {
		const { identifier, password } = req.body;
		const user = await User.findUser(identifier, password);
		if (!user) return res.status(401).send("Login failed.");
		const token = await user.genJWTToken();
		res.send({ user, token });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Get current user
router.get("/me", auth, (req, res) => {
	res.send(req.user);
});

// Logout of current session
router.get("/logout", auth, async (req, res) => {
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
router.get("/logout/all", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send(error);
	}
});

export default router;
