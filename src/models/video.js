import mongoose from "mongoose";
import User from "./user";
import { CommentSchema } from './comment'
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
	},
	customThumbnail: {
		type: Boolean,
		default: false
	},
	primaryThumbnail: {
		type: Number,
		default: 1
	},
	comments: [
		{
			comment: {
				type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
			}
		}
	]
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
		let files = await fs.readdir(videoDir);
		for (let file of files) {
			await fs.unlink(`${videoDir}/${file}`)
		}
		await fs.rmdir(videoDir);
	} catch (err) {
		console.error("Remove Error:", err)
	}
	next();
})

const Video = mongoose.model("Video", VideoSchema);
export { Video as default, VideoSchema };

