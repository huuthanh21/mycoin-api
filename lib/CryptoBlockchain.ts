import { CryptoBlock } from "./CryptoBlock";

class CryptoBlockchain {
	blockchain: CryptoBlock[];

	constructor() {
		this.blockchain = [this.startGenesisBlock()];
	}

	startGenesisBlock(): CryptoBlock {
		return new CryptoBlock({
			index: 0,
			timestamp: "01/01/2021",
			data: "Initial Block in the Chain",
			precedingHash: " ",
		});
	}

	obtainLatestBlock(): CryptoBlock {
		return this.blockchain[this.blockchain.length - 1];
	}

	addNewBlock(newBlock: CryptoBlock) {
		newBlock.precedingHash = this.obtainLatestBlock().hash;
		newBlock.hash = newBlock.computeHash();
		this.blockchain.push(newBlock);
	}
}

export default CryptoBlockchain;
