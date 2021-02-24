import Router from "express";
const router = Router();

import mongoose from "mongoose";

import videos from "./routes/videos.js";
import users from "./routes/users.js";
import comments from "./routes/comments";

router.get("/", (req, res) => res.send("Hello"));
router.use("/videos", videos);
router.use("/users", users);
router.use("/comments", comments);

mongoose.connect(`${process.env.MONGODB_URL}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

export default router;
