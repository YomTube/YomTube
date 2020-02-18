import mongoose from "mongoose";
import Video from "./video";

const CommentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	created_at: { type: Date, required: true },
	edited_at: { type: Date, default: null },
	score: { type: Number, default: 0 },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }
});

CommentSchema.pre('remove', async function (next) {
	const comment = this;
	try {
		let video = await Video.findById(comment.video);
		if (!video) throw new Error("Couldn't find video")

		video.comments = video.comments.filter(c => c.comment != comment.id);
		await video.save();
	} catch (err) {
		console.error("Remove Error:", err)
	}
	next();
})

const Comment = new mongoose.model("Comment", CommentSchema);
export default Comment;
