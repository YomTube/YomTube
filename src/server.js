import sirv from "sirv";
import Express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import bodyParser from "body-parser";

const { NODE_ENV, TYPE, PUBLIC_URL, LOCAL_URL } = process.env;
const dev = NODE_ENV === "development";

process.env.BASE_URL = TYPE === "public" ? PUBLIC_URL : LOCAL_URL

console.log(LOCAL_URL, PUBLIC_URL, process.env.BASE_URL)

const app = Express();
import backend from "./api/index.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", backend);
app.use("/test", Express.static("test"));

app.use(
	compression({ threshold: 0 }),
	sirv("./static", { dev }),
	sapper.middleware()
);

app.listen(process.env.PORT);
