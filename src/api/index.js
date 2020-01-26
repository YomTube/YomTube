import Router from 'express';
const router = Router();

import models, { connectDB } from '../models/index.js';

import videos from './routes/videos.js';

router.get('/', (req, res) => res.send("Hello"))
router.use('/videos', videos);

//roliga databasgrejer
const DB = connectDB();

export default router;