"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeBlockchain = initializeBlockchain;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const CryptoBlock_1 = require("../lib/CryptoBlock");
const CryptoBlockchain_1 = __importDefault(require("../lib/CryptoBlockchain"));
function initializeBlockchain() {
    const stakesData = JSON.parse(fs.readFileSync(path_1.default.resolve(__dirname, "../../data/stakes.json"), "utf-8"));
    let mycoin = new CryptoBlockchain_1.default();
    for (const item of stakesData) {
        mycoin.addValidator(item.address, item.stake);
    }
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
    const postStakes = [...mycoin.validators.values()];
    fs.writeFileSync(path_1.default.resolve(__dirname, "../../data/stakes.json"), JSON.stringify(postStakes, null, 4));
    console.log("Blockchain initialized with 2 blocks.");
    return mycoin;
}
