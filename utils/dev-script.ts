import { initializeBlockchain } from "./initBlockchain";

export default function runDevScript() {
	const smashingCoin = initializeBlockchain();
	console.log(JSON.stringify(smashingCoin, null, 4));
}
