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
const transactions_1 = require("../services/transactions");
const router = (0, express_1.Router)();
router.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, recipient, amount, privateKey } = req.body;
        const transaction = yield (0, transactions_1.sendTransaction)(sender, recipient, amount, privateKey);
        console.log(`Transaction sent: ${JSON.stringify(transaction, null, 2)}`);
        return res.status(200).json(transaction);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
exports.default = router;
