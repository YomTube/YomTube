import mongoose from 'mongoose';

import User from './user.js';
import Video from './video.js';
import Comment from './comment.js';

const connectDB = () => {
	return mongoose.connect("mongodb://localhost:27017/yomtube", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
			useCreateIndex: true
	});
}

export { connectDB, User, Video, Comment };