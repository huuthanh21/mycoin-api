"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dev_script_1 = __importDefault(require("../utils/dev-script"));
const db_1 = __importDefault(require("./db"));
const router = (0, express_1.Router)();
/* GET api page. */
router.get("/", (req, res) => {
    res.json({ title: "Express" });
});
router.get("/dev-script", (req, res) => {
    (0, dev_script_1.default)().then((result) => {
        res.json({ result });
    });
});
router.use("/db", db_1.default);
exports.default = router;
