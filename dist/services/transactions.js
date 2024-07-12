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
exports.getTransactions = getTransactions;
exports.insertTransaction = insertTransaction;
exports.sendTransaction = sendTransaction;
const postgres_1 = require("@vercel/postgres");
const stakes_1 = require("./stakes");
const wallets_1 = require("./wallets");
function insertTransaction(sender, recipient, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, postgres_1.sql) `
		INSERT INTO Transactions (sender, recipient, amount)
		VALUES (${sender}, ${recipient}, ${amount})
		RETURNING *;
	`;
        return result.rows[0];
    });
}
function sendTransaction(sender, recipient, amount, privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // Helper function to add two numbers
        const add = (a, b) => Number((a + b).toFixed(8));
        // Get sender's wallet
        const senderWallet = yield (0, wallets_1.getWalletWithPrivateKey)(privateKey);
        if (!senderWallet) {
            throw new Error("Invalid private key");
        }
        if (senderWallet.stake < amount) {
            throw new Error("Insufficient balance");
        }
        // Get recipient's wallet
        const recipientWallet = yield (0, wallets_1.getWalletWithAddress)(recipient);
        if (!recipientWallet) {
            throw new Error("Recipient does not exist");
        }
        // Update sender's stake
        yield (0, stakes_1.updateStakeAmount)(sender, add(senderWallet.stake, -amount));
        // Update recipient's stake
        yield (0, stakes_1.updateStakeAmount)(recipient, add(recipientWallet.stake, amount));
        // Insert transaction
        const result = yield insertTransaction(sender, recipient, amount);
        const transaction = {
            id: result.id,
            sender,
            recipient,
            amount,
            timestamp: result.timestamp,
        };
        return transaction;
    });
}
function getTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, postgres_1.sql) `
		SELECT * FROM Transactions
		ORDER BY timestamp ASC;
	`;
        return result.rows;
    });
}
