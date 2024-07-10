import { apiTest } from "./apiTest";
import { initializeBlockchain } from "./initBlockchain";

export default function runDevScript() {
	// apiTest();

	initializeBlockchain().then((result) => {
		const mycoin = result;
		console.log(JSON.stringify(mycoin, null, 4));
		console.log("Is blockchain valid? " + mycoin.checkChainValidity());
	});
}
