import { initializeBlockchain } from "./initBlockchain";

export default function runDevScript() {
	const mycoin = initializeBlockchain();
	console.log(JSON.stringify(mycoin, null, 4));
	console.log("Is blockchain valid? " + mycoin.checkChainValidity());
}
