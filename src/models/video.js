import mongoose from "mongoose";
import { promises } from "fs";
import User from "./user";

const VideoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	filePath: {
		type: String,
		required: true
	},
	uploaded_at: {
		type: Date,
		required: true
	},
	uploaded_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	available_qualities: [
		{
			quality: {
				type: Number,
				required: true
			}
		}
	]
});

VideoSchema.pre("save", async function(next) {
	const video = this;
	if (video.isModified("filePath") && video.filePath.includes("videos")) {
		let qualities = (await promises.readdir(video.filePath)).map(file =>
			parseInt(file.split(".")[0])
		);
		for (let quality of qualities) {
			video.available_qualities = video.available_qualities.concat({
				quality
			});
		}
	}
	if (video.isModified("uploaded_by")) {
		console.log("is modified");
		await User.findOneAndUpdate(
			{ _id: video.uploaded_at._id },
			{ $push: { videos: video } }
		);
	}

	next();
});

const Video = mongoose.model("Video", VideoSchema);
export default Video;
