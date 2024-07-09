import { CryptoBlock, CryptoBlockData, CryptoBlockInput } from "./CryptoBlock";

interface Validator {
	address: string;
	stake: number;
}

class CryptoBlockchain {
	blockchain: CryptoBlock[];
	validators: Map<string, Validator>;
	minimumStake: number;

	constructor() {
		this.blockchain = [this.startGenesisBlock()];
		this.validators = new Map();
		this.minimumStake = 1;
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

	addValidator(address: string, stake: number): boolean {
		if (stake < this.minimumStake) return false;

		if (this.validators.has(address)) return false;

		this.validators.set(address, { address, stake });
		return true;
	}

	removeValidator(address: string): boolean {
		if (!this.validators.has(address)) return false;

		this.validators.delete(address);
		return true;
	}

	selectValidator(): string {
		// Weighted random selection
		const totalStake = Array.from(this.validators.values()).reduce(
			(sum, validator) => sum + validator.stake,
			0
		);
		let random = Math.random() * totalStake;

		for (const [address, validator] of this.validators) {
			random -= validator.stake;
			if (random <= 0) return address;
		}

		// This should never happen
		throw new Error("No validator selected");
	}

	addNewBlock(data: CryptoBlockInput) {
		// Select a validator
		const validator = this.selectValidator();

		// TODO: Add the validator address to the block
		const newBlock = new CryptoBlock({
			...data,
			precedingHash: this.obtainLatestBlock().hash,
		});
		this.blockchain.push(newBlock);

		// Update the stake of the validator
		this.validators.get(validator)!.stake += 0.1;
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
