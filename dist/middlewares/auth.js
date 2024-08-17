"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).json({ message: 'Sin token, autorizacion denegada' });
    }
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Sin token, autorizacion denegada' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(401).json({ message: 'Token invalido' });
    }
};
exports.auth = auth;
