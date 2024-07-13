import express, { Request, Response } from "express";
import path from "path";
var cookieParser = require("cookie-parser");
var logger = require("morgan");

import cors from "cors";
import BlockchainSingleton from "./lib/BlockchainSingleton";
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

const blockchain = BlockchainSingleton.getInstance();

app.use("/api", apiRouter);
app.use("/wallet", walletRouter);
app.use("/transaction", transactionRouter);

app.get("/", async (req: Request, res: Response) => {
	console.log("GET /");
	try {
		const blockchain = await BlockchainSingleton.getInstance();
		return res.json(blockchain.blockchain);
	} catch (error) {
		console.error("Failed to get blockchain:", error);
		return res.status(500).json({ error: "Failed to retrieve blockchain" });
	}
});

export default app;
