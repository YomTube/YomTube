import Router from "express";
import Video from "../../models/video";
import multer from "multer";
import auth from "../middleware/auth";
import { promises as fs } from "fs";
import addToTranscoderQueue from "../../utils/transcoder";

const router = Router();

const GET_PATH = "/tmp";

const videoUpload = multer({
	dest: GET_PATH,
	fileFilter: (req, file, cb) => {
		if (!['video/x-msvideo',
			'video/ogg',
			'video/mpeg',
			'video/webm',
			'video/3gpp',
			'video/3gpp2',
			"video/h264",
			"video/h265",
			"video/mp4",
			"video/mpeg",
			"video/mpv",
			"video/ogg",
			"video/v9",
			"video/x-flv",
			"video/mp4",
			"video/MP2T",
			"video/3gpp",
			"video/quicktime",
			"video/x-ms-wmv"].includes(file.mimetype)) {
			req.fileValidationError = 'Wrong filetype';
			console.log("Wrong filetype")
			return cb(null, false)
		}
		console.log("Right filetype")
		cb(null, true);
	}
});

const thumbnailUpload = multer({
	dest: GET_PATH
})

let getVideoPath = (videoID) => `${process.cwd()}/videos/${videoID}`

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

// Get primary thumbnail
router.get("/:id/thumbnail", async (req, res) => {
	let id = req.params.id;
	try {
		const video = await Video.findById(id);
		res.sendFile(`videos/${video.id}/thumbnail-${video.primaryThumbnail}.png`, { root: process.cwd() });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Get thumbnail by index
router.get("/:id/thumbnail/:index", async (req, res) => {
	let { id, index } = req.params;
	try {
		const video = await Video.findById(id);
		if ((!video.customThumbnail && index == 0) || (index > 3 || index < 0))
			return res.status(404).send("Thumbnail doesn't exist.")
		res.sendFile(`videos/${video.id}/thumbnail-${index}.png`, { root: process.cwd() });
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

		res.sendFile(`videos/${video.id}/${quality}.mp4`, { root: process.cwd() });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Upload video
router.post("/", auth, videoUpload.single("file"), async (req, res) => {
	try {
		if (req.fileValidationError) throw req.fileValidationError
		if (!req.file) throw new Error("No file was provided");
		const { title } = req.body;
		const { filename } = req.file;
		let video = new Video({
			title: title,
			uploaded_by: req.user._id,
			uploaded_at: new Date()
		});

		await fs.mkdir(getVideoPath(video.id))
		await addToTranscoderQueue(`${GET_PATH}/${filename}`, video);
		await video.save();

		res.status(201).send({ video });
	} catch (err) {
		console.error("Got error:", err);
		res.status(400).send({ error: err.message });
	}
});

// Update a video
router.patch('/:id', auth, thumbnailUpload.single("file"), async (req, res) => {
	try {
		let { id } = req.params;
		let video = await Video.findById(id)
		if (!video)
			return res.status(404).send("That video doesn't exist.")
		let uploaderID = video.uploaded_by.toString();
		if (uploaderID !== req.user.id)
			return res.status(403).send("You don't own that video.")

		let { file } = req,
			{ title, description, primaryThumbnail } = req.body;

		if (file) {
			let customThumbnailPath = `${getVideoPath(video.id)}/thumbnail-0.png`;
			try {
				await fs.access(customThumbnailPath)
				await fs.unlink(customThumbnailPath)
			} catch (err) { }
			await fs.rename(file.path, customThumbnailPath)
			video.customThumbnail = true;
		}
		if ((primaryThumbnail == 0 && video.customThumbnail) || (primaryThumbnail >= 1 && primaryThumbnail <= 3))
			video.primaryThumbnail = primaryThumbnail
		else return res.status(404).send("Thumbnail doesn't exist.")
		if (title) video.title = title;
		if (description) video.description = description;
		await video.save();
		res.send(video)
	} catch (err) {
		res.status(400).send({ error: err.message })
	}
})

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

export default router;
