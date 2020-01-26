import sirv from 'sirv';
import Express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = Express();
import backend from './api/index.js';

app.use('/api', backend);

app.use(
	compression({ threshold: 0 }),
	sirv('./static', { dev }),
	sapper.middleware()
)

app.listen(process.env.PORT, () => console.log("Running!"))
