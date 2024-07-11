import * as bip39 from "bip39";
import { pbkdf2Sync, randomBytes } from "crypto";
import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { bytesToHex, hexToBytes } from "ethereum-cryptography/utils";

class Wallet {
	private privateKey: Uint8Array;
	public publicKey: string;
	public address: string;
	private mnemonic: string | null;

	private constructor(privateKey: Uint8Array, mnemonic: string | null = null) {
		this.privateKey = privateKey;
		this.publicKey = this.derivePublicKey();
		this.address = this.deriveAddress();
		this.mnemonic = mnemonic;
	}

	static createRandom(): Wallet {
		const privateKey = randomBytes(32);
		return new Wallet(privateKey);
	}

	static mnemonicToPrivateKey(mnemonic: string): Uint8Array {
		// Convert mnemonic to seed
		const seed = bip39.mnemonicToSeedSync(mnemonic);

		// Derive private key from seed
		return pbkdf2Sync(seed, "mnemonic", 2048, 32, "sha512");
	}

	static fromMnemonic(mnemonic: string): Wallet {
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

	private derivePublicKey(): string {
		const publicKey = secp256k1.getPublicKey(this.privateKey, false);
		return bytesToHex(publicKey.slice(1)); // Remove the first byte (0x04) which indicates uncompressed key
	}

	private deriveAddress(): string {
		const publicKeyBytes = hexToBytes(this.publicKey);
		const addressBytes = keccak256(publicKeyBytes).slice(-20); // Take last 20 bytes
		return "0x" + bytesToHex(addressBytes);
	}

	getPrivateKey(): string {
		return bytesToHex(this.privateKey);
	}

	getMnemonic(): string {
		if (this.mnemonic === null) {
			throw new Error("Mnemonic not available");
		}
		return this.mnemonic;
	}

	logWallet(): void {
		console.log("Private key:", this.getPrivateKey());
		console.log("Public key:", this.publicKey);
		console.log("Address:", this.address);
		console.log("Mnemonic:", this.getMnemonic());
	}
}

export { Wallet };
