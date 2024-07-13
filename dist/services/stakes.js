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
exports.getStakeAmount = getStakeAmount;
exports.getValidators = getValidators;
exports.insertStake = insertStake;
exports.updateStakeAmount = updateStakeAmount;
const postgres_1 = require("@vercel/postgres");
const constants_1 = require("../config/constants");
function getValidators() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, postgres_1.sql) `SELECT address, CAST(stake AS FLOAT) FROM Stakes`;
        const filtered = result.rows.filter((row) => row.stake > constants_1.MINIMUM_STAKE);
        return filtered;
    });
}
function insertStake(address, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, postgres_1.sql) `INSERT INTO Stakes (address, stake) VALUES (${address}, ${amount})`;
        if (result.rowCount !== 1)
            return false;
        console.info(`Inserted stake for ${address} with amount ${amount}`);
        return true;
    });
}
function getStakeAmount(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, postgres_1.sql) `SELECT stake FROM Stakes WHERE address = ${address}`;
        if (result.rows.length === 0)
            throw new Error("No stake found for this address.");
        return Number(result.rows[0].stake);
    });
}
function updateStakeAmount(address, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, postgres_1.sql) `UPDATE Stakes SET stake = ${amount} WHERE address = ${address}`;
        if (result.rowCount !== 1)
            return false;
        console.info(`Updated stake for ${address} to ${amount}`);
        return true;
    });
}
