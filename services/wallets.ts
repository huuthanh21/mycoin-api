import { sql } from "@vercel/postgres";
import { Wallet } from "../lib/Wallet";
import { getStakeAmount, insertStake } from "./stakes";

async function insertWallet(wallet: Wallet) {
	const wallet_result = await sql`
    INSERT INTO Wallets (address, public_key, encrypted_private_key)
    VALUES (${wallet.address}, ${
		wallet.publicKey
	}, ${wallet.getEncryptedPrivateKey()})
    RETURNING *;
  `;

	const stake_result = await insertStake(wallet.address, 0);
	if (!stake_result) {
		throw new Error("Failed to insert stake");
	}

	return wallet_result.rows[0];
}

async function getWalletWithPrivateKey(privateKey: string) {
	// Get wallet's address
	const wallet = Wallet.fromPrivateKey(privateKey);
	const wallet_result = await sql`
    SELECT * FROM Wallets WHERE address = ${wallet.address};
  `;
	if (wallet_result.rowCount === 0) {
		return null;
	}
	const address = wallet_result.rows[0].address;

	// Get wallet's stake
	const stake = await getStakeAmount(address);
	return { address, stake };
}

async function getWalletWithMnemonic(mnemonic: string) {
	// Get wallet's address
	const wallet = Wallet.fromMnemonic(mnemonic);
	const wallet_result = await sql`
		SELECT * FROM Wallets WHERE address = ${wallet.address};
	`;
	if (wallet_result.rowCount === 0) {
		return null;
	}
	const address = wallet_result.rows[0].address;
	console.log(address);

	// Get wallet's stake
	const stake = await getStakeAmount(address);
	return { address, stake };
}

export { getWalletWithMnemonic, getWalletWithPrivateKey, insertWallet };
