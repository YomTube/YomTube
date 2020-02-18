import Router from "express";
const router = Router();

import mongoose from 'mongoose';

import videos from "./routes/videos.js";
import users from "./routes/users.js";

router.get("/", (req, res) => res.send("Hello"));
router.use("/videos", videos);
router.use("/users", users);

const DB = mongoose.connect("mongodb://localhost:27017/yomtube", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

export default router;
