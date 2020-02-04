import Router from "express";
import { Video } from "../../models/index.js";
import multer from "multer";
import auth from "../middleware/auth";
import ffmpeg from "fluent-ffmpeg";
import { promises as fs } from "fs";

const router = Router();

const GET_PATH = "/tmp";
const SAVE_PATH = process.env.ROOT_DIR + "videos";

const upload = multer({ dest: GET_PATH });
// Get all videos
router.get("/", async (req, res) => {
	try {
		const videos = await Video.find({});
		res.send({ videos });
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

router.get("/:id/video", async (req, res) => {
	let id = req.params.id;
	try {
		const video = await Video.findOne({ _id: id }, "filePath");
		res.sendFile(video.filePath, { root: "/" });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

// Upload video
router.post("/", auth, upload.single("video"), async (req, res) => {
	try {
		if (!req.file) throw new Error("No file was provided");
		const { name, desc } = req.body;
		const { filename, path } = req.file;
		const video = new Video({
			title: name,
			description: desc,
			filePath: path,
			user: req.user
		});
		await video.save();

		let outputPath = `${SAVE_PATH}/${video._id}`;
		console.log(outputPath);
		await fs.mkdir(outputPath);
		video.filePath = outputPath;

		processVideo(`${GET_PATH}/${filename}`, video);
		res.status(201).send({ video });
	} catch (err) {
		console.error(err);
		res.status(400).send({ error: err.message });
	}
});
export default router;

function getRes(path) {
	return new Promise((res, rej) => {
		ffmpeg.ffprobe(path, function(err, metadata) {
			if (err) {
				rej(err);
			} else {
				console.log(metadata.streams[0]);
				let obj = {
					width: metadata.streams[0].width,
					height: metadata.streams[0].height
				};
				res(obj);
			}
		});
	});
}

function transcodeToRes(path, shortSide, bitrate, videoID, portrait) {
	return new Promise((res, rej) => {
		let localSavePath = savePath + videoID + "/" + shortSide + ".mp4";
		let resolution = portrait ? "-1:" + shortSide : shortSide + ":-1";
		let scaleFilter = "scale_npp=" + resolution;
		ffmpeg()
			.input(path)
			.inputOption([
				"-vsync 0",
				"-hwaccel cuvid",
				"-hwaccel_device 0",
				"-c:v h264_cuvid"
			])
			.videoCodec("h264_nvenc")
			.videoFilter(scaleFilter)
			.native()
			.audioCodec("aac")
			.audioBitrate(128)
			.audioChannels(2)
			.videoBitrate(bitrate)
			.save(localSavePath)
			.on("error", err => {
				ffmpeg()
					.input(path)
					.videoCodec("h264_nvenc")
					.videoFilter(["hwupload_cuda", scaleFilter])
					.native()
					.audioCodec("aac")
					.audioBitrate(128)
					.audioChannels(2)
					// .videoCodec('libx264')
					.videoBitrate(bitrate)
					// .size(resolution)
					// .keepDAR()
					.save(localSavePath)
					.on("error", err => {
						console.log(
							"failed software transocde" + resolution
						);
						// console.log(err);
						rej(err);
					})
					.on("end", () => {
						res();
					});
			})
			.on("end", () => {
				res();
			});
	});
}

let processVideo = async (path, video) => {
	let videoID = video._id;
	return new Promise(async (res, rej) => {
		let obj = await getRes(path).catch(error => console.error(error));

		let qualities = [
			{
				res: 2160,
				bitrate: 45000
			},
			{
				res: 1440,
				bitrate: 16000
			},
			{
				res: 1080,
				bitrate: 8000
			},
			{
				res: 720,
				bitrate: 5000
			},
			{
				res: 480,
				bitrate: 2500
			},
			{
				res: 360,
				bitrate: 1000
			},
			{
				res: 240,
				bitrate: 500
			}
		];

		try {
			if (obj) {
				let portrait = obj.width <= obj.height;
				let maxest = Math.max(obj.width, obj.height);
				let available_qualities = qualities.filter(
					quality => maxest >= quality.res
				);
				await Promise.all(
					available_qualities.map(quality =>
						transcodeToRes(
							path,
							quality.res,
							quality.bitrate,
							videoID,
							portrait
						)
					)
				);
				await fs.unlink(path);
				console.log("Finished transcoding for %s", videoID);
				await video.save();
				return res();
			}
		} catch (err) {
			rej(err);
		}
	});
};
