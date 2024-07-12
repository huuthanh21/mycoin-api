import { initializeBlockchain } from "../utils/initBlockchain";
import CryptoBlockchain from "./CryptoBlockchain";

class BlockchainSingleton {
	private static instance: Promise<CryptoBlockchain>;

	private constructor() {}

	public static async getInstance(): Promise<CryptoBlockchain> {
		if (!BlockchainSingleton.instance) {
			BlockchainSingleton.instance = initializeBlockchain();
		}
		return BlockchainSingleton.instance;
	}
}

export default BlockchainSingleton;
