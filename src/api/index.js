import Router from "express";
const router = Router();

import { connectDB, User } from "../models/index.js";

import videos from "./routes/videos.js";
import users from "./routes/users.js";

router.get("/", (req, res) => res.send("Hello"));
router.use("/videos", videos);
router.use("/users", users);

const DB = connectDB();

export default router;
