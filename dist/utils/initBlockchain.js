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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeBlockchain = initializeBlockchain;
const CryptoBlockchain_1 = __importDefault(require("../lib/CryptoBlockchain"));
const stakes_1 = require("../services/stakes");
const transactions_1 = require("../services/transactions");
function initializeBlockchain() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Fetching validators...");
        const stakesData = yield (0, stakes_1.getValidators)();
        console.log("Initializing blockchain...");
        let mycoin = new CryptoBlockchain_1.default();
        for (const item of stakesData) {
            mycoin.addValidator(item.address, item.stake);
        }
        // Fetching transactions from database
        console.log("Fetching transactions...");
        const transaction = yield (0, transactions_1.getTransactions)();
        console.log("Adding transactions to blockchain...");
        for (const item of transaction) {
            yield mycoin.addTransaction(item.sender, item.recipient, item.amount, item.timestamp);
        }
        console.log(`Blockchain initialized with ${transaction.length} blocks.`);
        return mycoin;
    });
}
