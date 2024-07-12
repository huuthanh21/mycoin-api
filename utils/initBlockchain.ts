import { CryptoBlock } from "../lib/CryptoBlock";
import CryptoBlockchain from "../lib/CryptoBlockchain";
import { getValidators } from "../services/stakes";

export async function initializeBlockchain(): Promise<CryptoBlockchain> {
	console.log("Fetching validators...");
	const stakesData = await getValidators();

	console.log("Initializing blockchain...");
	let mycoin = new CryptoBlockchain();
	for (const item of stakesData) {
		mycoin.addValidator(item.address, item.stake);
	}

	await mycoin.addNewBlock(
		new CryptoBlock({
			index: 1,
			timestamp: "01/06/2020",
			data: {
				sender: "Iris Ljesnjanin",
				recipient: "Cosima Mielke",
				quantity: 100,
			},
		})
	);

	await mycoin.addNewBlock(
		new CryptoBlock({
			index: 2,
			timestamp: "01/07/2020",
			data: {
				sender: "Vitaly Friedman",
				recipient: "Ricardo Gimenes",
				quantity: 100,
			},
		})
	);

	console.log("Blockchain initialized with 2 blocks.");

	return mycoin;
}
