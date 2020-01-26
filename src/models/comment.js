import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	created_at: { type: Date, default: Date.now },
	edited_at: { type: Date, default: null },
	likes: { type: Number, default: 0n },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Comment = new mongoose.model('Comment', commentSchema)
export default Comment;