import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: String,
	filePath: { type: String, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
	uploaded_at: { type: Date, default: Date.now },
})

const Video = mongoose.model('Video', VideoSchema);
export default Video;