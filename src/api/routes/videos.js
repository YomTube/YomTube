import Router from "express";
import { Video } from "../../models/index.js";
import multer from "multer";
import auth from "../middleware/auth";
import { promises as fs } from "fs";
import addToTranscoderQueue from "../utils/transcoder";

const router = Router();

const GET_PATH = "/tmp";
const SAVE_PATH = process.env.ROOT_DIR + "videos";

const upload = multer({ dest: GET_PATH });
// Get all videos
router.get("/", async (req, res) => {
	try {
		const videos = await Video.find({ waitingOnTranscode: false });
		res.json(videos);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Get specific video
router.get("/:id", async (req, res) => {
	let id = req.params.id;
	try {
		const video = await Video.findOne({ _id: id });
		res.send({ video });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

router.get("/:id/thumbnail", async (req, res) => {
	let id = req.params.id;
	try {
		const video = await Video.findOne({ _id: id });
		res.sendFile(`${video.filePath}/thumbnail.png`, { root: "/" });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

router.get("/:id/:quality", async (req, res) => {
	let id = req.params.id;
	let quality = req.params.quality;
	try {
		const video = await Video.findOne({ _id: id });
		if (!video.available_qualities.includes(quality))
			throw new Error("Quality doesn't exist");

		res.sendFile(`${video.filePath}/${quality}.mp4`, { root: "/" });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Upload video
router.post("/", auth, upload.single("video"), async (req, res) => {
	try {
		if (!req.file) throw new Error("No file was provided");
		const { title, description } = req.body;
		const { filename, path } = req.file;
		let video = new Video({
			title: title,
			description: description,
			filePath: path,
			uploaded_by: req.user._id,
			uploaded_at: new Date()
		});

		let outputPath = `${SAVE_PATH}/${video._id}`;
		await fs.mkdir(outputPath);
		video.filePath = outputPath;
		await addToTranscoderQueue(`${GET_PATH}/${filename}`, video);
		await video.save();

		res.status(201).send({ video });
	} catch (err) {
		console.error(err);
		res.status(400).send({ error: err.message });
	}
});

export default router;
