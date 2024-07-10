import { apiTest } from "./apiTest";
import { initializeBlockchain } from "./initBlockchain";

export default async function runDevScript(): Promise<string> {
	// apiTest();

	const mycoin = await initializeBlockchain();
	return JSON.stringify(mycoin, null, 4);
}
