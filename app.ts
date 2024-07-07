import express, { Request, Response } from "express";
import path from "path";
var cookieParser = require("cookie-parser");
var logger = require("morgan");

import apiRouter from "./routes/api";
import runDevScript from "./utils/dev-script";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

// Run the dev script
runDevScript();

export default app;

