import mongoose from 'mongoose';
import { promises } from 'fs';

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
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: false
	},
	uploaded_at: {
		type: Date,
		default: Date.now
	},
	available_qualities: [
		{
			quality: {
				type: Number,
				required: true,
			}
		}
	]
})

VideoSchema.pre('save', async function (next) {
	const video = this;
	if (video.isModified('filePath') && video.filePath.includes('videos')) {
		let qualities = (await promises.readdir(video.filePath)).map(file => parseInt(file.split('.')[0]));
		for (let quality of qualities) {
			video.available_qualities = video.available_qualities.concat({ quality })
		}
	}
	next();
})

const Video = mongoose.model('Video', VideoSchema);
export default Video;