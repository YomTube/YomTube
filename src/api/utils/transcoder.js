import ffmpeg from "fluent-ffmpeg";
import { promises as fs } from "fs";

const SAVE_PATH = process.env.ROOT_DIR + "videos";

const supportedQualities = [
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

let isTranscoding = false;
const transcodingQueue = []

let getRes = (path) => {
	return new Promise((res, rej) => {
		ffmpeg.ffprobe(path, function (err, metadata) {
			if (err) rej(err);
			res({
				width: metadata.streams[0].width,
				height: metadata.streams[0].height
			});
		})
	});
}

function transcodeToRes(path, shortSide, bitrate, videoID, portrait) {
	return new Promise((res, rej) => {
		let localSavePath =
			SAVE_PATH + "/" + videoID + "/" + shortSide + ".mp4";
		let resolution = portrait ? shortSide + ":-1" : "-1:" + shortSide;
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
			.videoFilter("scale_npp=" + resolution)
			.audioCodec("aac")
			.audioBitrate(128)
			.audioChannels(2)
			.videoBitrate(bitrate)
			.save(localSavePath)
			.on("error", err => {
				console.log("GPU Transcoding failed. Using CPU with GPU scaling!");
				ffmpeg()
					.input(path)
					.videoCodec("h264_nvenc")
					.videoFilter(["hwupload_cuda", scaleFilter])
					.audioCodec("aac")
					.audioBitrate(128)
					.audioChannels(2)
					.videoBitrate(bitrate)
					.save(localSavePath)
					.on("error", err => {
						console.log("GPU Scaling failed. Using only CPU!")
						ffmpeg()
							.input(path)
							.audioCodec('aac')
							.audioBitrate(128)
							.audioChannels(2)
							.videoCodec('libx264')
							.videoBitrate(bitrate)
							.size(resolution)
							.save(localSavePath)
							.on('error', (err) => rej(err))
							.on('end', res);
					})
					.on("end", res);
			})
			.on("end", res)

	});
}

let generateThumbnail = (path, videoID) => {
	return new Promise((res, rej) => {
		let folder = SAVE_PATH + "/" + videoID;
		ffmpeg()
			.input(path)
			.screenshots({
				timestamps: ["50%"],
				filename: "thumbnail.png",
				folder: folder,
				size: "1600x900"
			})
			.on("error", err => rej(err))
			.on("end", res);
	});
};

let processVideo = async (videoElement) => {
	isTranscoding = true;
	let { video, path } = videoElement;
	let videoID = video._id;
	let obj = await getRes(path).catch(err =>
		console.error("GetResError", err)
	);

	if (!obj) {
		console.log("Couldn't find object")
		transcodingQueue.push(videoElement);
		return processVideo(transcodingQueue.shift())
	}
	console.log("Started transcoding for %s", video.title)

	let portrait = obj.width <= obj.height;
	let minest = Math.min(obj.width, obj.height);
	let localSupportedQualities = supportedQualities.filter(quality => minest >= quality.res);

	for await (let quality of localSupportedQualities) {
		try {
			const { res, bitrate } = quality;
			let startTime = Date.now();
			await transcodeToRes(
				path,
				res,
				bitrate,
				videoID,
				portrait
			);
			console.log("Finished transcoding %i p in %d ms", res, Date.now() - startTime)
			video.available_qualities.push(res)
		} catch (err) {
			console.error(err);
		}
	}
	console.log("Finished all transcodes for", video.title)
	video.waitingOnTranscode = false;
	await video.save();
	await fs.unlink(path);
	if (transcodingQueue.length > 0) return processVideo(transcodingQueue.shift())
	isTranscoding = false;
	console.log("Queue is empty.")
};

let addToTranscoderQueue = async (path, video) => {
	try {
		console.log("Adding %s to the queue", video.title)
		await generateThumbnail(path, video._id)
		await video.save();
		transcodingQueue.push({ video, path });
		if (!isTranscoding) processVideo(transcodingQueue.shift())
		return;
	} catch (err) { console.error("error", err) }
}

export default addToTranscoderQueue;
