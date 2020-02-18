import mongoose from "mongoose";
import User from "./user";
import { promises as fs } from 'fs';

const VideoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
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

VideoSchema.pre('remove', async function (next) {
	const video = this;

	try {
		let user = await User.findById(video.uploaded_by);
		if (!user)
			throw new Error("Couldn't find user")
		user.videos = user.videos.filter(v => v.video != video._id);
		await user.save();
		let videoDir = `${process.cwd()}/videos/${video.id}`;
		for (let quality of video.available_qualities) {
			await fs.unlink(`${videoDir}/${quality}.mp4`)
		}
		await fs.unlink(`${videoDir}/thumbnail.png`)
		await fs.rmdir(videoDir);
	} catch (err) {
		console.error("Remove Error:", err)
	}
	next();
})

const Video = mongoose.model("Video", VideoSchema);
export default Video;
