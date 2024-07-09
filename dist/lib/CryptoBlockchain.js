"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoBlock_1 = require("./CryptoBlock");
class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.validators = new Map();
        this.minimumStake = 0.1;
        this.reward = 0.1;
    }
    startGenesisBlock() {
        return new CryptoBlock_1.CryptoBlock({
            index: 0,
            timestamp: "01/01/2021",
            data: "Initial Block in the Chain",
            precedingHash: "0",
        });
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addValidator(address, stake) {
        if (stake < this.minimumStake)
            return false;
        if (this.validators.has(address))
            return false;
        this.validators.set(address, { address, stake });
        return true;
    }
    removeValidator(address) {
        if (!this.validators.has(address))
            return false;
        this.validators.delete(address);
        return true;
    }
    selectValidator() {
        // Weighted random selection
        const totalStake = Array.from(this.validators.values()).reduce((sum, validator) => sum + validator.stake, 0);
        let random = Math.random() * totalStake;
        for (const [address, validator] of this.validators) {
            random -= validator.stake;
            if (random <= 0)
                return address;
        }
        // This should never happen
        throw new Error("No validator selected");
    }
    rewardValidator(address) {
        const newStake = Number((this.validators.get(address).stake + this.reward).toFixed(8));
        this.validators.set(address, { address, stake: newStake });
    }
    addNewBlock(data) {
        // Select a validator
        const validator = this.selectValidator();
        // TODO: Add the validator address to the block
        const newBlock = new CryptoBlock_1.CryptoBlock(Object.assign(Object.assign({}, data), { precedingHash: this.obtainLatestBlock().hash }));
        this.blockchain.push(newBlock);
        // Update the stake of the validator
        return this.rewardValidator(validator);
    }
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.precedingHash !== precedingBlock.hash)
                return false;
        }
        return true;
    }
}
exports.default = CryptoBlockchain;
