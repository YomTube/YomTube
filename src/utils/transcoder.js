import ffmpeg from "fluent-ffmpeg";
import { promises as fs } from "fs";
import { exec } from 'child_process'

const SAVE_PATH = process.cwd() + "/videos";

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
		ffmpeg.ffprobe(path, (err, metadata) => {
			if (err) rej(err);
			for (let stream of metadata.streams) {
				let { width, height } = stream;
				if (width && height) {
					res({ width, height })
					break;
				}
			}
		})
	});
}

let transcodeToRes = (path, shortSide, bitrate, videoID, portrait) => {
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
							.size(portrait ? shortSide + "x?" : "?x" + shortSide)
							.save(localSavePath)
							.on('error', (err) => rej(err))
							.on('end', res);
					})
					.on("end", res);
			})
			.on("end", res)

	});
}

let msToHMS = (ms) => {
	var seconds = ms / 1000;
	var hours = parseInt(seconds / 3600);
	seconds = seconds % 3600;
	var minutes = parseInt(seconds / 60);
	seconds = seconds % 60;
	return (hours + ":" + minutes + ":" + seconds);
}

let generateThumbnail = (path, videoID) => {
	return new Promise((res, rej) => {
		console.log("Generating thumbnails...")
		let folder = SAVE_PATH + "/" + videoID;
		ffmpeg()
			.input(path)
			.ffprobe((err, data) => {
				if (err) rej(err)
				try {
					let { duration } = data.format;
					let durationInMs = duration * 1000;
					let durationAt25 = Math.floor(0.25 * durationInMs)
					exec(`ffmpeg \
-ss ${msToHMS(durationAt25)} -i ${path} \
-ss ${msToHMS(2 * durationAt25)} -i ${path} \
-ss ${msToHMS(3 * durationAt25)} -i ${path} \
-map 0:v -vframes 1 ${folder}/thumbnail-1.png \
-map 1:v -vframes 1 ${folder}/thumbnail-2.png \
-map 2:v -vframes 1 ${folder}/thumbnail-3.png`)
						.on('exit', res)
						.on('error', rej)
				} catch (err) {
					rej(err)
				}
			})
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
	console.time("Transcoder Timer")

	let portrait = obj.width <= obj.height;
	let minest = Math.min(obj.width, obj.height);
	let localSupportedQualities = supportedQualities.filter(quality => minest >= quality.res);

	for await (let quality of localSupportedQualities) {
		try {
			const { res, bitrate } = quality;
			await transcodeToRes(
				path,
				res,
				bitrate,
				videoID,
				portrait
			);
			console.timeLog("Transcoder Timer", `\t${video.title}`, `\t${res}p`)
			video.available_qualities.push(res)
		} catch (err) {
			console.error(err);
		}
	}
	console.timeEnd("Transcoder Timer")
	video.waitingOnTranscode = false;
	await video.save();
	await fs.unlink(path);
	if (transcodingQueue.length > 0) return processVideo(transcodingQueue.shift())
	isTranscoding = false;
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