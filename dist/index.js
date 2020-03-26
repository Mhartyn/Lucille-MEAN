"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const mongoose_1 = __importDefault(require("mongoose"));
let port = (process.env.PORT || 3000);
const server = server_1.default.init(port);
mongoose_1.default.connect('mongodb://localhost:27017/presupuesto', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('BD conectada....');
});
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
