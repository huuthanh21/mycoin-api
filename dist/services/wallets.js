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
exports.getWalletWithMnemonic = getWalletWithMnemonic;
exports.getWalletWithPrivateKey = getWalletWithPrivateKey;
exports.insertWallet = insertWallet;
const postgres_1 = require("@vercel/postgres");
const Wallet_1 = require("../lib/Wallet");
const stakes_1 = require("./stakes");
function insertWallet(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet_result = yield (0, postgres_1.sql) `
    INSERT INTO Wallets (address, public_key, encrypted_private_key)
    VALUES (${wallet.address}, ${wallet.publicKey}, ${wallet.getEncryptedPrivateKey()})
    RETURNING *;
  `;
        const stake_result = yield (0, stakes_1.insertStake)(wallet.address, 0);
        if (!stake_result) {
            throw new Error("Failed to insert stake");
        }
        return wallet_result.rows[0];
    });
}
function getWalletWithPrivateKey(privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get wallet's address
        const wallet = Wallet_1.Wallet.fromPrivateKey(privateKey);
        const wallet_result = yield (0, postgres_1.sql) `
    SELECT * FROM Wallets WHERE address = ${wallet.address};
  `;
        if (wallet_result.rowCount === 0) {
            return null;
        }
        const address = wallet_result.rows[0].address;
        // Get wallet's stake
        const stake = yield (0, stakes_1.getStakeAmount)(address);
        return { address, stake };
    });
}
function getWalletWithMnemonic(mnemonic) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get wallet's address
        const wallet = Wallet_1.Wallet.fromMnemonic(mnemonic);
        const wallet_result = yield (0, postgres_1.sql) `
		SELECT * FROM Wallets WHERE address = ${wallet.address};
	`;
        if (wallet_result.rowCount === 0) {
            return null;
        }
        const address = wallet_result.rows[0].address;
        console.log(address);
        // Get wallet's stake
        const stake = yield (0, stakes_1.getStakeAmount)(address);
        return { address, stake };
    });
}
