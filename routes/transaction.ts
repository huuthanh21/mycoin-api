import { Router } from "express";
import { sendTransaction } from "../services/transactions";

const router = Router();

router.post("/send", async (req, res) => {
	try {
		const { sender, recipient, amount, privateKey } = req.body;
		const transaction = await sendTransaction(
			sender,
			recipient,
			amount,
			privateKey
		);
		console.log(`Transaction sent: ${JSON.stringify(transaction, null, 2)}`);
		return res.status(200).json(transaction);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

export default router;
