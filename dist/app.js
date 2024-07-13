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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors_1 = __importDefault(require("cors"));
const BlockchainSingleton_1 = __importDefault(require("./lib/BlockchainSingleton"));
const api_1 = __importDefault(require("./routes/api"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const wallet_1 = __importDefault(require("./routes/wallet"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const blockchain = BlockchainSingleton_1.default.getInstance();
app.use("/api", api_1.default);
app.use("/wallet", wallet_1.default);
app.use("/transaction", transaction_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET /");
    try {
        const blockchain = yield BlockchainSingleton_1.default.getInstance();
        return res.json(blockchain.blockchain);
    }
    catch (error) {
        console.error("Failed to get blockchain:", error);
        return res.status(500).json({ error: "Failed to retrieve blockchain" });
    }
}));
exports.default = app;
