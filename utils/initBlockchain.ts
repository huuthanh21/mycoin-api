import { CryptoBlock } from "../lib/CryptoBlock";
import CryptoBlockchain from "../lib/CryptoBlockchain";

export function initializeBlockchain(): CryptoBlockchain {
	let smashingCoin = new CryptoBlockchain();
	smashingCoin.addNewBlock(
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
	smashingCoin.addNewBlock(
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
	return smashingCoin;
}
