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
		ref: "User",
		required: true
	},
	available_qualities: [Number],
	waitingOnTranscode: {
		type: Boolean,
		default: true,
	}
});

VideoSchema.pre("save", async function (next) {
	const video = this;

	if (video.isModified("uploaded_by")) {
		let user = await User.findById(video.uploaded_by)
		user.videos = user.videos.concat({ video })
		await user.save();
	}

	next();
});

const Video = mongoose.model("Video", VideoSchema);
export default Video;
