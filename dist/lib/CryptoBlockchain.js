"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
const stakes_1 = require("../services/stakes");
const CryptoBlock_1 = require("./CryptoBlock");
class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.validators = new Map();
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
        if (stake < constants_1.MINIMUM_STAKE)
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
    /**
     * Selects a validator based on a weighted random selection algorithm.
     *
     * @returns {string} The address of the selected validator.
     * @throws {Error} If no validator is selected (should never happen).
     */
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
    setStake(address, stake) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validators.set(address, { address, stake });
            yield (0, stakes_1.updateStakeAmount)(address, stake).then((result) => {
                if (!result) {
                    throw new Error("Failed to update stake for " + address);
                }
            });
        });
    }
    rewardValidator(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStake = Number((this.validators.get(address).stake + constants_1.REWARD).toFixed(8));
            yield this.setStake(address, newStake);
        });
    }
    addNewBlock(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Select a validator
            const validator = this.selectValidator();
            // TODO: Add the validator address to the block
            const newBlock = new CryptoBlock_1.CryptoBlock(Object.assign(Object.assign({}, data), { precedingHash: this.obtainLatestBlock().hash }));
            this.blockchain.push(newBlock);
            // Update the stake of the validator
            return yield this.rewardValidator(validator);
        });
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
