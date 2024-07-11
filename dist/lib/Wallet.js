"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const bip39 = __importStar(require("bip39"));
const crypto_1 = require("crypto");
const keccak_1 = require("ethereum-cryptography/keccak");
const secp256k1_1 = require("ethereum-cryptography/secp256k1");
const utils_1 = require("ethereum-cryptography/utils");
class Wallet {
    constructor(privateKey, mnemonic = null) {
        this.privateKey = privateKey;
        this.publicKey = this.derivePublicKey();
        this.address = this.deriveAddress();
        this.mnemonic = mnemonic;
    }
    static createRandom() {
        const privateKey = (0, crypto_1.randomBytes)(32);
        return new Wallet(privateKey);
    }
    static mnemonicToPrivateKey(mnemonic) {
        // Convert mnemonic to seed
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        // Derive private key from seed
        return (0, crypto_1.pbkdf2Sync)(seed, "mnemonic", 2048, 32, "sha512");
    }
    static fromMnemonic(mnemonic) {
        // Validate mnemonic
        const words = mnemonic.trim().split(/\s+/);
        if (words.length !== 12) {
            throw new Error("Mnemonic must be 12 words");
        }
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error("Invalid mnemonic");
        }
        const privateKey = this.mnemonicToPrivateKey(mnemonic);
        return new Wallet(privateKey, mnemonic);
    }
    derivePublicKey() {
        const publicKey = secp256k1_1.secp256k1.getPublicKey(this.privateKey, false);
        return (0, utils_1.bytesToHex)(publicKey.slice(1)); // Remove the first byte (0x04) which indicates uncompressed key
    }
    deriveAddress() {
        const publicKeyBytes = (0, utils_1.hexToBytes)(this.publicKey);
        const addressBytes = (0, keccak_1.keccak256)(publicKeyBytes).slice(-20); // Take last 20 bytes
        return "0x" + (0, utils_1.bytesToHex)(addressBytes);
    }
    getPrivateKey() {
        return (0, utils_1.bytesToHex)(this.privateKey);
    }
    getMnemonic() {
        if (this.mnemonic === null) {
            throw new Error("Mnemonic not available");
        }
        return this.mnemonic;
    }
    logWallet() {
        console.log("Private key:", this.getPrivateKey());
        console.log("Public key:", this.publicKey);
        console.log("Address:", this.address);
        console.log("Mnemonic:", this.getMnemonic());
    }
}
exports.Wallet = Wallet;
