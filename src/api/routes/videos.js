import Router from 'express';
import { Video } from '../../models/index.js';
const router = Router();

router.get("/", (req, res) => {
	Video.find({}, (err, result) => {
		if (err) throw err;
		res.json(result)
	});
})

router.get("/:id", (req, res) => {
	let id = req.params.id;
	Video.findOne({ '_id': id }, 'filePath', function (err, result) {
		if (err) return res.sendStatus(404);
		res.sendFile(result.filePath, { root: "/" });
	});
});
export default router;

