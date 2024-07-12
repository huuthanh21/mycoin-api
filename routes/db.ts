import { sql } from "@vercel/postgres";
import { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import { Wallet } from "../lib/Wallet";
import { insertWallet } from "../services/wallets";

const router = Router();

router.get("/create-stakes-table.ts", async (req: Request, res: Response) => {
	try {
		const result =
			await sql`CREATE TABLE Stakes ( address varchar(255), stake double precision );`;
		return res.status(200).json({ result });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get("/create-wallet-table.ts", async (req: Request, res: Response) => {
	try {
		const result = await sql`
        CREATE TABLE wallets (
          id SERIAL PRIMARY KEY,
          address VARCHAR(255) UNIQUE NOT NULL,
          public_key VARCHAR(255) NOT NULL,
          encrypted_private_key TEXT NOT NULL
        );
      `;
		return res.status(200).json({ result });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get(
	"/create-transactions-table.ts",
	async (req: Request, res: Response) => {
		try {
			const result = await sql`
				CREATE TABLE transactions (
					id SERIAL PRIMARY KEY,
					sender VARCHAR(255) NOT NULL,
					recipient VARCHAR(255) NOT NULL,
					amount DOUBLE PRECISION NOT NULL,
					timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
				);
			`;
			return res.status(200).json({ result });
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
);

router.get("/insert-wallet.ts", async (req: Request, res: Response) => {
	const wallet = Wallet.createRandom();
	wallet.logWallet();
	try {
		// Insert the wallet into the wallets table
		const result = await insertWallet(wallet);

		// Insert the wallet into the stakes table
		await sql`
      INSERT INTO stakes (address, stake)
      VALUES (${wallet.address}, 0);
    `;
		return res.status(200).json({ result });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get("/drop-wallet-table.ts", async (req: Request, res: Response) => {
	try {
		const result = await sql`DROP TABLE Wallets;`;
		return res.status(200).json({ result });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get("/db/drop-stakes-table.ts", async (req: Request, res: Response) => {
	try {
		const result = await sql`DROP TABLE Stakes;`;
		return res.status(200).json({ result });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

router.get(
	"/db/drop-transactions-table.ts",
	async (req: Request, res: Response) => {
		try {
			const result = await sql`DROP TABLE Transactions;`;
			return res.status(200).json({ result });
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
);

export default router;
