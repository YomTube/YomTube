import sirv from "sirv";
import Express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import bodyParser from "body-parser";

import backend from "./api/";
import frontendAuth from './api/middleware/frontendAuth'

const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", backend);
app.use("/test", Express.static("test"));

app.use(
	compression({ threshold: 0 }),
	frontendAuth,
	sirv("./static", { dev }),
	sapper.middleware()
);

app.listen(process.env.PORT);
