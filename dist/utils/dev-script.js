"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runDevScript;
const initBlockchain_1 = require("./initBlockchain");
function runDevScript() {
    const smashingCoin = (0, initBlockchain_1.initializeBlockchain)();
    console.log(JSON.stringify(smashingCoin, null, 4));
}
