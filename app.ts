import express, { Request, Response } from "express";
import path from "path";
var cookieParser = require("cookie-parser");
var logger = require("morgan");

import cors from "cors";
import apiRouter from "./routes/api";
import transactionRouter from "./routes/transaction";
import walletRouter from "./routes/wallet";

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("/wallet", walletRouter);
app.use("/transaction", transactionRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

export default app;
