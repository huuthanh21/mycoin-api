"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoBlock = void 0;
const sha256_1 = __importDefault(require("crypto-js/sha256"));
class CryptoBlock {
    constructor({ index, timestamp, data, precedingHash = " ", validator = " ", }) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.validator = validator;
    }
    computeHash() {
        return (0, sha256_1.default)(this.index +
            this.precedingHash +
            this.timestamp +
            this.validator +
            JSON.stringify(this.data)).toString();
    }
}
exports.CryptoBlock = CryptoBlock;
