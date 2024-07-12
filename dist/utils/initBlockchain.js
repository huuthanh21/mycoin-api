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
const CryptoBlock_1 = require("../lib/CryptoBlock");
const CryptoBlockchain_1 = __importDefault(require("../lib/CryptoBlockchain"));
const stakes_1 = require("../services/stakes");
function initializeBlockchain() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Fetching validators...");
        const stakesData = yield (0, stakes_1.getValidators)();
        console.log("Initializing blockchain...");
        let mycoin = new CryptoBlockchain_1.default();
        for (const item of stakesData) {
            mycoin.addValidator(item.address, item.stake);
        }
        yield mycoin.addNewBlock(new CryptoBlock_1.CryptoBlock({
            index: 1,
            timestamp: "01/06/2020",
            data: {
                sender: "Iris Ljesnjanin",
                recipient: "Cosima Mielke",
                quantity: 100,
            },
        }));
        yield mycoin.addNewBlock(new CryptoBlock_1.CryptoBlock({
            index: 2,
            timestamp: "01/07/2020",
            data: {
                sender: "Vitaly Friedman",
                recipient: "Ricardo Gimenes",
                quantity: 100,
            },
        }));
        console.log("Blockchain initialized with 2 blocks.");
        return mycoin;
    });
}
