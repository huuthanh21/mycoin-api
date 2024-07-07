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
			precedingHash: "0",
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

	checkChainValidity(): boolean {
		for (let i = 1; i < this.blockchain.length; i++) {
			const currentBlock = this.blockchain[i];
			const precedingBlock = this.blockchain[i - 1];

			if (currentBlock.hash !== currentBlock.computeHash()) {
				return false;
			}
			if (currentBlock.precedingHash !== precedingBlock.hash) return false;
		}
		return true;
	}
}

export default CryptoBlockchain;
