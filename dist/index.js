"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sync_1 = __importDefault(require("./db/sync"));
const articulosRoute_1 = __importDefault(require("./routes/articulosRoute"));
const autenticacionRoute_1 = __importDefault(require("./routes/autenticacionRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("./middlewares/auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = require("./swagger");
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, swagger_1.setupSwagger)(app);
(0, sync_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use('/autenticacion', autenticacionRoute_1.default);
app.use('/articulos', auth_1.auth, articulosRoute_1.default);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
