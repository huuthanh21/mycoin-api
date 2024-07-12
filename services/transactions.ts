import { updateStakeAmount } from "./stakes";
import { getWalletWithAddress, getWalletWithPrivateKey } from "./wallets";

async function sendTransaction(
	sender: string,
	recipient: string,
	amount: number,
	privateKey: string
) {
	// Get sender's wallet
	const senderWallet = await getWalletWithPrivateKey(privateKey);
	if (!senderWallet) {
		throw new Error("Invalid private key");
	}
	if (senderWallet.stake < amount) {
		throw new Error("Insufficient balance");
	}
	// Get recipient's wallet
	const recipientWallet = await getWalletWithAddress(recipient);
	if (!recipientWallet) {
		throw new Error("Recipient does not exist");
	}
	// Update sender's stake
	await updateStakeAmount(sender, senderWallet.stake - amount);
	// Update recipient's stake
	await updateStakeAmount(recipient, recipientWallet.stake + amount);
	return { sender, recipient, amount };
}
