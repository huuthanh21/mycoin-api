import CryptoBlockchain from "../lib/CryptoBlockchain";
import { getValidators } from "../services/stakes";
import { getTransactions } from "../services/transactions";

export async function initializeBlockchain(): Promise<CryptoBlockchain> {
	console.log("Fetching validators...");
	const stakesData = await getValidators();

	console.log("Initializing blockchain...");
	let mycoin = new CryptoBlockchain();
	for (const item of stakesData) {
		mycoin.addValidator(item.address, item.stake);
	}

	// Fetching transactions from database
	console.log("Fetching transactions...");
	const transaction = await getTransactions();

	console.log("Adding transactions to blockchain...");
	for (const item of transaction) {
		await mycoin.addTransaction(
			item.sender,
			item.recipient,
			item.amount,
			item.timestamp
		);
	}

	console.log(`Blockchain initialized with ${transaction.length} blocks.`);

	return mycoin;
}
