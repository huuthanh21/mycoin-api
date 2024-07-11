import { Request, Response, Router } from "express";
import { Wallet } from "../lib/Wallet";
import {
	getWalletWithMnemonic,
	getWalletWithPrivateKey,
	insertWallet,
} from "../services/wallets";

const router = Router();

router.get("/random-private-key", (req: Request, res: Response) => {
	try {
		return res.status(200).json({ privateKey: Wallet.randomPrivateKey() });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get("/random-mnemonic", (req: Request, res: Response) => {
	try {
		return res.status(200).json({ mnemonic: Wallet.randomMnemonic() });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get(
	"/getFromPrivateKey/:privateKey",
	async (req: Request, res: Response) => {
		try {
			const privateKey = req.params.privateKey;
			return res.status(200).json(await getWalletWithPrivateKey(privateKey));
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
);

router.get(
	"/getFromMnemonic/:mnemonic",
	async (req: Request, res: Response) => {
		try {
			const mnemonic = req.params.mnemonic;
			console.log(mnemonic);

			return res.status(200).json(await getWalletWithMnemonic(mnemonic));
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
);

router.post("/createFromPrivateKey", async (req: Request, res: Response) => {
	try {
		const { privateKey } = req.body as { privateKey: string };

		const wallet = Wallet.fromPrivateKey(privateKey);
		const id = await insertWallet(wallet);

		return res.status(200).json({ id });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.post("/createFromMnemonic", async (req: Request, res: Response) => {
	try {
		const { mnemonic } = req.body as { mnemonic: string };

		const wallet = Wallet.fromMnemonic(mnemonic);
		const id = await insertWallet(wallet);

		return res.status(200).json({ id });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

export default router;
