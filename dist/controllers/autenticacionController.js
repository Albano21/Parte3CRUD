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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contraseña } = req.body;
    if (!email || !contraseña) {
        return res.status(401).json({ message: 'Credenciales Invalidas' });
    }
    try {
        //usuario harcodeado
        const usuario = {
            email: "Flexxus",
            contraseña: "desafio_i+d",
            id: 1
        };
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales Invalidas' });
        }
        const salt = yield bcryptjs_1.default.genSalt(12);
        usuario.contraseña = yield bcryptjs_1.default.hash(usuario.contraseña, salt);
        const isMatch = yield bcryptjs_1.default.compare(contraseña, usuario.contraseña);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales Invalidas' });
        }
        const payload = { user: { id: usuario.id } };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
            if (err)
                throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 2 * 60 * 60 * 1000
            });
            return res.json({ message: 'Autenticado' });
        });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).send('Server error');
    }
});
exports.login = login;
