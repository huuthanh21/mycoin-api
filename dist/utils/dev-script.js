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
exports.default = runDevScript;
const BlockchainSingleton_1 = __importDefault(require("../lib/BlockchainSingleton"));
const CryptoBlock_1 = require("../lib/CryptoBlock");
function runDevScript() {
    return __awaiter(this, void 0, void 0, function* () {
        // apiTest();
        // const mycoin = await initializeBlockchain();
        // return JSON.stringify(mycoin, null, 4);
        // const wallet = Wallet.fromMnemonic(
        // 	"candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
        // );
        // wallet.logWallet();
        try {
            const blockchain = yield BlockchainSingleton_1.default.getInstance();
            // get last block
            const lastBlock = blockchain.obtainLatestBlock();
            blockchain.addNewBlock(new CryptoBlock_1.CryptoBlock({
                index: lastBlock.index + 1,
                timestamp: "01/06/2020",
                data: {
                    sender: "Huu Thanh",
                    recipient: "Thien",
                    quantity: 100,
                },
            }));
            console.log("Added 1 block");
        }
        catch (error) {
            console.error("Failed to add block:", error);
        }
        return "Hello, world!";
    });
}
