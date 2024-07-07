"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runDevScript;
const initBlockchain_1 = require("./initBlockchain");
function runDevScript() {
    const mycoin = (0, initBlockchain_1.initializeBlockchain)();
    console.log(JSON.stringify(mycoin, null, 4));
    console.log("Is blockchain valid? " + mycoin.checkChainValidity());
}
