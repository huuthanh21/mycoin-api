"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoBlock_1 = require("./CryptoBlock");
class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
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
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
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
