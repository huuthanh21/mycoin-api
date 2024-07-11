import { sql } from "@vercel/postgres";
import { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import runDevScript from "../utils/dev-script";
import db from "./db";

const router = Router();

/* GET api page. */
router.get("/", (req: Request, res: Response) => {
	res.json({ title: "Express" });
});

router.get("/dev-script", (req: Request, res: Response) => {
	runDevScript().then((result) => {
		res.json({ result });
	});
});

router.use("/db", db);

export default router;
