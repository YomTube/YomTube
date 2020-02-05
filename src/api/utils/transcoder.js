const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const savePath = "/home/yom/test/out/";



function getRes(path) {
	return new Promise((res, rej) => {

		ffmpeg.ffprobe(path, function (err, metadata) {
			if (err) {
				rej(err);
			} else {
				console.log(metadata.streams[0])
				let obj = {
					width: metadata.streams[0].width,
					height: metadata.streams[0].height
				};
				res(obj);
			}
		});

	})

}


function transcodeToRes(path, shortSide, bitrate, videoID, portrait) {
	return new Promise((res, rej) => {
		let localSavePath = savePath + videoID + "/" + shortSide + ".mp4";
		let resolution = portrait ? "-1:" + shortSide : shortSide + ":-1";
		let scaleFilter = "scale_npp=" + resolution;
		console.log("starting hardware encode")
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
			.native()
			.audioCodec('aac')
			.audioBitrate(128)
			.audioChannels(2)
			// .videoCodec('libx264')
			.videoBitrate(bitrate)
			// .size(resolution)
			// .keepDAR()
			.save(localSavePath)
			.on('error', (err) => {
				//rej(err);

				console.log("failed hardware transcode" + resolution);
				console.log("starting software transcode " + resolution);

				ffmpeg()
					.input(path)
					.videoCodec("h264_nvenc")
					.videoFilter([
						"hwupload_cuda",
						scaleFilter
					])
					.native()
					.audioCodec('aac')
					.audioBitrate(128)
					.audioChannels(2)
					// .videoCodec('libx264')
					.videoBitrate(bitrate)
					// .size(resolution)
					// .keepDAR()
					.save(localSavePath)
					.on('error', (err) => {
						console.log("failed software transocde" + resolution)
						// console.log(err);
						rej(err);
					})
					.on('end', () => {
						console.log("sw" + resolution + " done")
						res();
					});

			})
			.on('end', () => {
				console.log("hw " + resolution + " done");
				res();
			});

	}

	)
}

function generateThumbnail(path, videoID) {
	return new Promise((res, rej) => {
		ffmpeg()
			.input(path)
			.size("1920x1080")
	})
}

export default async function processVideo(path, videoID) {
	let obj = await getRes(path)
		.catch(error => console.error('GetResError', error));

	if (!fs.existsSync(savePath + videoID)) {
		fs.mkdirSync(savePath + videoID);
	}

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
			bitrate: 1000,
		},
		{
			res: 240,
			bitrate: 500,
		}
	]

	if (obj) {
		let portrait = obj.width <= obj.height;
		let minest = Math.min(obj.width, obj.height);
		qualities = qualities.filter(quality => minest >= quality.res);
		console.log(portrait);
		console.log(minest);
		console.log(qualities);
		for await (let quality of qualities) {
			try {
				await transcodeToRes(path, quality.res, quality.bitrate, videoID, portrait)
			} catch (err) {
				console.error(err)
			}
		}
	}
}

// console.log(processVideo("/home/yom/test/Kent_4K_Portrait.mp4", "asdasdasdyfasdfaseeshasd_landscape"));
// console.log(processVideo("/home/yom/test/VC-1_sample.mkv", "asdasdasdyeeadsfqw32sdfshasd_landscape"));