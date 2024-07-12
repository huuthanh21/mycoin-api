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
const express_1 = require("express");
const Wallet_1 = require("../lib/Wallet");
const wallets_1 = require("../services/wallets");
const router = (0, express_1.Router)();
router.get("/random-private-key", (req, res) => {
    try {
        return res.status(200).json({ privateKey: Wallet_1.Wallet.randomPrivateKey() });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
router.get("/random-mnemonic", (req, res) => {
    try {
        return res.status(200).json({ mnemonic: Wallet_1.Wallet.randomMnemonic() });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
router.get("/getFromPrivateKey/:privateKey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const privateKey = req.params.privateKey;
        const wallet = yield (0, wallets_1.getWalletWithPrivateKey)(privateKey);
        if (!wallet) {
            return res.status(404).json({ error: "Wallet not found" });
        }
        return res.status(200).json(wallet);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.get("/getFromMnemonic/:mnemonic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mnemonic = req.params.mnemonic;
        console.log(mnemonic);
        return res.status(200).json(yield (0, wallets_1.getWalletWithMnemonic)(mnemonic));
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.post("/createFromPrivateKey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { privateKey } = req.body;
        const wallet = Wallet_1.Wallet.fromPrivateKey(privateKey);
        const id = yield (0, wallets_1.insertWallet)(wallet);
        return res.status(200).json({ id });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.post("/createFromMnemonic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mnemonic } = req.body;
        const wallet = Wallet_1.Wallet.fromMnemonic(mnemonic);
        const id = yield (0, wallets_1.insertWallet)(wallet);
        return res.status(200).json({ id });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
exports.default = router;
