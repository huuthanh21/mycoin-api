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
const express_1 = require("express");
const BlockchainSingleton_1 = __importDefault(require("../lib/BlockchainSingleton"));
const transactions_1 = require("../services/transactions");
const router = (0, express_1.Router)();
router.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, recipient, amount, privateKey } = req.body;
        const transaction = yield (0, transactions_1.sendTransaction)(sender, recipient, amount, privateKey);
        console.log(`Transaction sent: ${JSON.stringify(transaction, null, 2)}`);
        const blockchain = yield BlockchainSingleton_1.default.getInstance();
        yield blockchain.addTransaction(sender, recipient, amount, transaction.timestamp);
        return res.status(200).json(transaction);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.get("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield (0, transactions_1.getTransactions)("DESC");
        return res.status(200).json(transactions);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
exports.default = router;
