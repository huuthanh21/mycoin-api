import bcrypt from "bcrypt";
import BlockchainSingleton from "../lib/BlockchainSingleton";
import { CryptoBlock } from "../lib/CryptoBlock";
import { Wallet } from "../lib/Wallet";
import { updateStakeAmount } from "../services/stakes";
import { insertWallet } from "../services/wallets";
import { apiTest } from "./apiTest";
import { initializeBlockchain } from "./initBlockchain";

export default async function runDevScript(): Promise<string> {
	// apiTest();

	// const mycoin = await initializeBlockchain();
	// return JSON.stringify(mycoin, null, 4);

	// const wallet = Wallet.fromMnemonic(
	// 	"candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
	// );
	// wallet.logWallet();

	try {
		const blockchain = await BlockchainSingleton.getInstance();
		// get last block
		const lastBlock: CryptoBlock = blockchain.obtainLatestBlock();
		blockchain.addNewBlock(
			new CryptoBlock({
				index: lastBlock.index + 1,
				timestamp: "01/06/2020",
				data: {
					sender: "Huu Thanh",
					recipient: "Thien",
					quantity: 100,
				},
			})
		);
		console.log("Added 1 block");
	} catch (error) {
		console.error("Failed to add block:", error);
	}

	return "Hello, world!";
}
