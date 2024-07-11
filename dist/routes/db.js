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
const postgres_1 = require("@vercel/postgres");
const express_1 = require("express");
const Wallet_1 = require("../lib/Wallet");
const wallets_1 = require("../services/wallets");
const router = (0, express_1.Router)();
router.get("/create-stakes-table.ts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `CREATE TABLE Stakes ( address varchar(255), stake double precision );`;
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.get("/create-wallet-table.ts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `
        CREATE TABLE wallets (
          id SERIAL PRIMARY KEY,
          address VARCHAR(255) UNIQUE NOT NULL,
          public_key VARCHAR(255) NOT NULL,
          encrypted_private_key TEXT NOT NULL
        );
      `;
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.get("/insert-wallet.ts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = Wallet_1.Wallet.createRandom();
    wallet.logWallet();
    try {
        // Insert the wallet into the wallets table
        const result = yield (0, wallets_1.insertWallet)(wallet);
        // Insert the wallet into the stakes table
        yield (0, postgres_1.sql) `
      INSERT INTO stakes (address, stake)
      VALUES (${wallet.address}, 0);
    `;
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.get("/drop-wallet-table.ts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `DROP TABLE Wallets;`;
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.get("/db/drop-stakes-table.ts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `DROP TABLE Stakes;`;
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
exports.default = router;
