import * as fs from "fs";
import path from "path";
import { CryptoBlock } from "../lib/CryptoBlock";
import CryptoBlockchain from "../lib/CryptoBlockchain";

export function initializeBlockchain(): CryptoBlockchain {
	const stakesData = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, "../../data/stakes.json"), "utf-8")
	);

	let mycoin = new CryptoBlockchain();
	for (const item of stakesData) {
		mycoin.addValidator(item.address, item.stake);
	}

	mycoin.addNewBlock(
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
	mycoin.addNewBlock(
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

	const postStakes = [...mycoin.validators.values()];
	fs.writeFileSync(
		path.resolve(__dirname, "../../data/stakes.json"),
		JSON.stringify(postStakes, null, 4)
	);

	console.log("Blockchain initialized with 2 blocks.");

	return mycoin;
}
