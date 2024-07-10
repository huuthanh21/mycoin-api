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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("@vercel/postgres");
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dev_script_1 = __importDefault(require("../utils/dev-script"));
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
router.get("/db/create-stakes-table.ts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `CREATE TABLE Stakes ( address varchar(255), stake double precision );`;
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.get("/db/drop-stakes-table.ts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `DROP TABLE Stakes;`;
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.get("/db/insert-stakes.ts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stakesData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(process.cwd(), "data/stakes.json"), "utf-8"));
    try {
        yield postgres_1.sql.query(`INSERT INTO stakes (address, stake)
			SELECT address, stake FROM json_populate_recordset(NULL::stakes, $1)`, [JSON.stringify(stakesData)]);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
    const stakes = yield (0, postgres_1.sql) `SELECT * FROM stakes;`;
    return res.status(200).json({ stakes });
}));
exports.default = router;
