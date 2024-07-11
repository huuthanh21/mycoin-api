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
exports.default = runDevScript;
const Wallet_1 = require("../lib/Wallet");
function runDevScript() {
    return __awaiter(this, void 0, void 0, function* () {
        // apiTest();
        // const mycoin = await initializeBlockchain();
        // return JSON.stringify(mycoin, null, 4);
        const wallet = Wallet_1.Wallet.fromMnemonic("candy maple cake sugar pudding cream honey rich smooth crumble sweet treat");
        wallet.logWallet();
        return "Hello, world!";
    });
}
