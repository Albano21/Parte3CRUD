"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
function sincronizar() {
    connection_1.default.sync()
        .then(() => {
        console.log('Sincronización completa de modelos.');
    })
        .catch(err => {
        console.error('Error al sincronizar modelos:', err);
    });
}
exports.default = sincronizar;
