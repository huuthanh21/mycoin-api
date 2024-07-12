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
const stakes_1 = require("./stakes");
const wallets_1 = require("./wallets");
function sendTransaction(sender, recipient, amount, privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield (0, stakes_1.updateStakeAmount)(sender, senderWallet.stake - amount);
        // Update recipient's stake
        yield (0, stakes_1.updateStakeAmount)(recipient, recipientWallet.stake + amount);
        return { sender, recipient, amount };
    });
}
