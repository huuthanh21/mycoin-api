import { Request, Response, Router } from "express";

const router = Router();

/* GET api page. */
router.get("/", (req: Request, res: Response) => {
	res.json({ title: "Express" });
});

export default router;

