import bcrypt from "bcrypt";
import { Wallet } from "../lib/Wallet";
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

	// const wallet2 = Wallet.fromPrivateKey(wallet.getPrivateKey());
	// wallet2.logWallet();

	const mnemonic = Wallet.randomMnemonic();
	console.log(mnemonic);

	return "Hello, world!";
}
