import SHA256 from "crypto-js/sha256";

type CryptoBlockData = {
	quantity: number;
	sender: string;
	recipient: string;
};

type CryptoBlockInput = {
	index: number;
	timestamp: string;
	data: CryptoBlockData | string;
	precedingHash?: string;
	validator?: string;
};

class CryptoBlock {
	index: number;
	timestamp: string;
	data: CryptoBlockData | string;
	precedingHash: string;
	validator: string;
	hash: string;

	constructor({
		index,
		timestamp,
		data,
		precedingHash = " ",
		validator = " ",
	}: CryptoBlockInput) {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.precedingHash = precedingHash;
		this.hash = this.computeHash();
		this.validator = validator;
	}

	computeHash(): string {
		return SHA256(
			this.index +
				this.precedingHash +
				this.timestamp +
				this.validator +
				JSON.stringify(this.data)
		).toString();
	}
}

export { CryptoBlock, CryptoBlockData, CryptoBlockInput };
