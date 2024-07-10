"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runDevScript;
const initBlockchain_1 = require("./initBlockchain");
function runDevScript() {
    // apiTest();
    (0, initBlockchain_1.initializeBlockchain)().then((result) => {
        const mycoin = result;
        console.log(JSON.stringify(mycoin, null, 4));
        console.log("Is blockchain valid? " + mycoin.checkChainValidity());
    });
}
