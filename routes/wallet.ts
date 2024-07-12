import { Request, Response, Router } from "express";
import { Wallet } from "../lib/Wallet";
import { getStakeAmount } from "../services/stakes";
import {
	getWalletWithAddress,
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

router.get("/getFromAddress/:address", async (req: Request, res: Response) => {
	try {
		const address = req.params.address;
		const wallet = await getWalletWithAddress(address);
		if (!wallet) {
			return res.status(404).json({ error: "Wallet not found" });
		}
		return res.status(200).json(wallet);
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get(
	"/getFromPrivateKey/:privateKey",
	async (req: Request, res: Response) => {
		try {
			const privateKey = req.params.privateKey;
			const wallet = await getWalletWithPrivateKey(privateKey);
			if (!wallet) {
				return res.status(404).json({ error: "Wallet not found" });
			}
			return res.status(200).json(wallet);
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
			const wallet = await getWalletWithMnemonic(mnemonic);
			if (!wallet) {
				return res.status(404).json({ error: "Wallet not found" });
			}
			return res.status(200).json(wallet);
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
);

router.post("/createFromPrivateKey", async (req: Request, res: Response) => {
	try {
		const { privateKey } = req.body as { privateKey: string };

		const wallet = Wallet.fromPrivateKey(privateKey);
		const walletResult = await insertWallet(wallet);

		return res.status(200).json({ address: walletResult.address });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.post("/createFromMnemonic", async (req: Request, res: Response) => {
	try {
		const { mnemonic } = req.body as { mnemonic: string };

		const wallet = Wallet.fromMnemonic(mnemonic);
		const walletResult = await insertWallet(wallet);

		return res.status(200).json({
			address: walletResult.address,
			privateKey: wallet.getPrivateKey(),
		});
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get("/balance/:address", async (req: Request, res: Response) => {
	try {
		const balance = await getStakeAmount(req.params.address);
		return res.status(200).json({ balance });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

export default router;
