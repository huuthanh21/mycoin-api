import { MINIMUM_STAKE, REWARD } from "../config/constants";
import { updateStakeAmount } from "../services/stakes";
import { CryptoBlock, CryptoBlockInput } from "./CryptoBlock";

interface Validator {
	address: string;
	stake: number;
}

class CryptoBlockchain {
	blockchain: CryptoBlock[];
	validators: Map<string, Validator>;

	constructor() {
		this.blockchain = [this.startGenesisBlock()];
		this.validators = new Map();
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
		if (stake < MINIMUM_STAKE) return false;

		if (this.validators.has(address)) return false;

		this.validators.set(address, { address, stake });
		return true;
	}

	removeValidator(address: string): boolean {
		if (!this.validators.has(address)) return false;

		this.validators.delete(address);
		return true;
	}

	/**
	 * Selects a validator based on a weighted random selection algorithm.
	 *
	 * @returns {string} The address of the selected validator.
	 * @throws {Error} If no validator is selected (should never happen).
	 */
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

	async setStake(address: string, stake: number) {
		this.validators.set(address, { address, stake });
		await updateStakeAmount(address, stake).then((result) => {
			if (!result) {
				throw new Error("Failed to update stake for " + address);
			}
		});
	}

	async rewardValidator(address: string) {
		const newStake = Number(
			(this.validators.get(address)!.stake + REWARD).toFixed(8)
		);
		await this.setStake(address, newStake);
	}

	async addNewBlock(data: CryptoBlockInput) {
		// Select a validator
		const validator = this.selectValidator();

		const newBlock = new CryptoBlock({
			...data,
			precedingHash: this.obtainLatestBlock().hash,
			validator,
		});
		this.blockchain.push(newBlock);

		// Update the stake of the validator
		return await this.rewardValidator(validator);
	}

	async addTransaction(
		sender: string,
		recipient: string,
		amount: number,
		timestamp: string
	) {
		return this.addNewBlock({
			index: this.obtainLatestBlock().index + 1,
			timestamp,
			data: {
				sender,
				recipient,
				quantity: amount,
			},
		});
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
