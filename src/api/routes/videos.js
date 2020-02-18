import Router from "express";
import Video from "../../models/video";
import multer from "multer";
import auth from "../middleware/auth";
import { promises as fs } from "fs";
import addToTranscoderQueue from "../../utils/transcoder";

const router = Router();

const GET_PATH = "/tmp";

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
		const video = await Video.findOne({ _id: id })
			.populate({
				path: 'uploaded_by',
				populate: { path: 'uploaded_by' }
			})

		res.send({ video });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

router.get("/:id/thumbnail", async (req, res) => {
	let id = req.params.id;
	try {
		const video = await Video.findOne({ _id: id });
		res.sendFile(`videos/${video.id}/thumbnail.png`, { root: process.env.ROOT_DIR });
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

		res.sendFile(`videos/${video.id}/${quality}.mp4`, { root: process.env.ROOT_DIR });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Delete a video
router.delete('/:id', auth, async (req, res) => {
	let id = req.params.id;
	try {
		const video = await Video.findOne({ _id: id });
		if (!video)
			throw new Error("That video doesn't exist.")
		let uploaderID = video.uploaded_by.toString();
		let userID = req.user._id.toString();
		if (uploaderID != userID)
			throw new Error("You don't own that video.")

		video.remove();
		res.send("Successfully removed video.")
	} catch (err) {
		res.status(403).send({ error: err.message });
	}
})

// Upload video
router.post("/", auth, upload.single("video"), async (req, res) => {
	try {
		if (!req.file) throw new Error("No file was provided");
		const { title, description } = req.body;
		const { filename, path } = req.file;
		let video = new Video({
			title: title,
			description: description,
			uploaded_by: req.user._id,
			uploaded_at: new Date()
		});

		let outputPath = `videos/${video._id}`;
		await fs.mkdir(process.env.ROOT_DIR + outputPath)
		await addToTranscoderQueue(`${GET_PATH}/${filename}`, video);
		await video.save();

		res.status(201).send({ video });
	} catch (err) {
		console.error(err);
		res.status(400).send({ error: err.message });
	}
});

export default router;
