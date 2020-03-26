"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./routes/login"));
const grupo_1 = __importDefault(require("./routes/grupo"));
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    static init(puerto) {
        return new Server(puerto);
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback);
        this.app.use(login_1.default);
        this.app.use(grupo_1.default);
        this.publicFolder();
    }
}
exports.default = Server;
