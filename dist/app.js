"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const api_1 = __importDefault(require("./routes/api"));
const dev_script_1 = __importDefault(require("./utils/dev-script"));
const app = (0, express_1.default)();
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/api", api_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Run the dev script
(0, dev_script_1.default)();
exports.default = app;
