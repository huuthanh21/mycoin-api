"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeBlockchain = initializeBlockchain;
const CryptoBlock_1 = require("../lib/CryptoBlock");
const CryptoBlockchain_1 = __importDefault(require("../lib/CryptoBlockchain"));
function initializeBlockchain() {
    let mycoin = new CryptoBlockchain_1.default();
    mycoin.addNewBlock(new CryptoBlock_1.CryptoBlock({
        index: 1,
        timestamp: "01/06/2020",
        data: {
            sender: "Iris Ljesnjanin",
            recipient: "Cosima Mielke",
            quantity: 100,
        },
    }));
    mycoin.addNewBlock(new CryptoBlock_1.CryptoBlock({
        index: 2,
        timestamp: "01/07/2020",
        data: {
            sender: "Vitaly Friedman",
            recipient: "Ricardo Gimenes",
            quantity: 100,
        },
    }));
    return mycoin;
}
