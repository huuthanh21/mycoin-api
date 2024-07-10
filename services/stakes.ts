import { sql } from "@vercel/postgres";
import { MINIMUM_STAKE } from "../config/constants";

async function getValidators(): Promise<any> {
	const result = await sql`SELECT * FROM Stakes`;
	const filtered = result.rows.filter((row) => row.stake > MINIMUM_STAKE);
	return filtered;
}

async function getStakeAmount(address: string): Promise<number> {
	const result = await sql`SELECT stake FROM Stakes WHERE address = ${address}`;

	if (result.rows.length === 0)
		throw new Error("No stake found for this address.");

	return Number(result.rows[0].stake);
}
async function updateStakeAmount(
	address: string,
	amount: number
): Promise<boolean> {
	const result =
		await sql`UPDATE Stakes SET stake = ${amount} WHERE address = ${address}`;

	if (result.rowCount !== 1) return false;

	console.info(`Updated stake for ${address} to ${amount}`);
	return true;
}

export { getStakeAmount, getValidators, updateStakeAmount };
