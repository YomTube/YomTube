import Router from 'express';
import auth from "../middleware/auth";
import Video from '../../models/video';
import Comment from '../../models/comment';

const router = Router();

// Get comments for videoID
router.get('/:videoID', async (req, res) => {
	let { videoID } = req.params;
	try {
		let video = await Video.findById(videoID)
		let comments = await Comment.find({ _id: { $in: video.comments.map(c => c.comment) } })
		res.send(comments)
	} catch (err) {
		res.status(400).send({ error: err.message })
	}
});

// Post a comment
router.post('/:videoID', auth, async (req, res) => {
	let { videoID } = req.params;
	try {
		let { text } = req.body;
		let video = await Video.findById(videoID)
		let comment = new Comment({
			text: text,
			user: req.user,
			video: video,
			created_at: Date.now()
		})
		video.comments = video.comments.concat({ comment });
		await video.save();
		await comment.save();
		res.sendStatus(201);
	} catch (err) {
		res.status(400).send({ error: err.message })
	}
})

router.put('/:videoID/:commendID', auth, async (req, res) => {
	let { videoID, commentID } = req.params;
	let { text } = req.body
	try {
		let video = await Video.findById(videoID)
		let comment = await Comment.findById(commentID);
		if (!video || !comment) throw new Error("Resource couldn't be found")
		if (comment.user != req.user.id) throw new Error("You dont have permission to remove that comment")
		if (video.id != comment.video) throw new Error("Comment doesn't belong to that video")
		if (!text || text.length == 0) throw new Error("Comment can't be empty")

		comment.text = text;
		await comment.save();

		res.send("Changed comment")
	} catch (err) {
		res.status(400).send({ error: err.message })
	}
})

// Delete a comment
router.delete('/:videoID/:commentID', auth, async (req, res) => {
	let { videoID, commentID } = req.params;

	try {
		let video = await Video.findById(videoID)
		let comment = await Comment.findById(commentID);
		if (!video || !comment) throw new Error("Resource couldn't be found")
		if (comment.user != req.user.id) throw new Error("You dont have permission to remove that comment")
		if (video.id != comment.video) throw new Error("Comment doesn't belong to that video")

		await comment.remove();
		res.sendStatus(202);
	} catch (err) {
		res.status(400).send({ error: err.message })
	}
})

export default router;