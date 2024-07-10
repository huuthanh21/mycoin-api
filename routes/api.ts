import { sql } from "@vercel/postgres";
import { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import runDevScript from "../utils/dev-script";

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

router.get(
	"/db/create-stakes-table.ts",
	async (req: Request, res: Response) => {
		try {
			const result =
				await sql`CREATE TABLE Stakes ( address varchar(255), stake double precision );`;
			return res.status(200).json({ result });
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
);

router.get("/db/drop-stakes-table.ts", async (req: Request, res: Response) => {
	try {
		const result = await sql`DROP TABLE Stakes;`;
		return res.status(200).json({ result });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get("/db/insert-stakes.ts", async (req: Request, res: Response) => {
	const stakesData: Array<any> = JSON.parse(
		fs.readFileSync(path.join(process.cwd(), "data/stakes.json"), "utf-8")
	);
	try {
		await sql.query(
			`INSERT INTO stakes (address, stake)
			SELECT address, stake FROM json_populate_recordset(NULL::stakes, $1)`,
			[JSON.stringify(stakesData)]
		);
	} catch (error) {
		return res.status(500).json({ error });
	}

	const stakes = await sql`SELECT * FROM stakes;`;
	return res.status(200).json({ stakes });
});

export default router;

