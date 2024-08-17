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
exports.modificarArticulo = exports.borrarArticulo = exports.registrarArticulo = exports.buscarArticulo = exports.listadoArticulos = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const articulo_1 = __importDefault(require("../models/articulo"));
const filtrosArticulos_1 = require("./filtrosArticulos");
const marca_1 = __importDefault(require("../models/marca"));
const articuloValidator_1 = require("../validators/articuloValidator");
const listadoArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        const where = (0, filtrosArticulos_1.obtenerFiltros)(req.query);
        const articulos = yield articulo_1.default.findAll({
            attributes: ['ID', 'NOMBRE', 'FECHA_MODIFICACION', 'ESTADO_ACTIVACION'],
            order: [
                ['NOMBRE', 'ASC']
            ],
            where,
            include: [
                {
                    model: marca_1.default,
                    attributes: ['NOMBRE'],
                    as: 'MARCA'
                }
            ]
        });
        return res.json(articulos);
    }
    catch (err) {
        return res.status(500).json({ errors: 'Error al obtener los artículos.' });
    }
});
exports.listadoArticulos = listadoArticulos;
const buscarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        const ID = obtenerId(req, res);
        const articulo = yield articulo_1.default.findByPk(ID, {
            attributes: ['ID', 'NOMBRE', 'FECHA_MODIFICACION', 'ESTADO_ACTIVACION'],
            include: [
                {
                    model: marca_1.default,
                    attributes: ['NOMBRE'],
                    as: 'MARCA'
                }
            ]
        });
        if (articulo && articulo.ESTADO_ACTIVACION == true) {
            return res.status(200).json(articulo);
        }
        else {
            return res.status(404).json({ errors: 'Artículo no encontrado.' });
        }
    }
    catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ errors: 'Error al buscar el artículo.' });
        }
    }
});
exports.buscarArticulo = buscarArticulo;
const registrarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        const articuloData = yield (0, articuloValidator_1.validarArticulo)(req, res);
        completarArticulo(articuloData);
        yield articulo_1.default.create(articuloData);
        return res.status(201).json({ message: 'Registro de artículo exitoso.' });
    }
    catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ errors: 'Error al registrar el artículo.' });
        }
    }
});
exports.registrarArticulo = registrarArticulo;
const borrarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        const ID = obtenerId(req, res);
        const articulo = yield articulo_1.default.findByPk(ID);
        if (articulo && articulo.ESTADO_ACTIVACION == true) {
            articulo.update({ ESTADO_ACTIVACION: false });
            return res.status(200).json({ message: 'Artículo eliminado exitosamente' });
        }
        else {
            return res.status(404).json({ errors: 'Artículo no encontrado.' });
        }
    }
    catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ errors: 'Error al eliminar el artículo.' });
        }
    }
});
exports.borrarArticulo = borrarArticulo;
const modificarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        const ID = obtenerId(req, res);
        const articuloData = yield (0, articuloValidator_1.validarArticulo)(req, res);
        completarArticulo(articuloData);
        const articulo = yield articulo_1.default.findByPk(ID);
        if (articulo) {
            articulo.update(articuloData);
            return res.status(200).json({ message: 'Artículo modificado exitosamente' });
        }
        else {
            return res.status(404).json({ errors: 'Artículo no encontrado.' });
        }
    }
    catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ errors: 'Error al modificar el artículo.' });
        }
    }
});
exports.modificarArticulo = modificarArticulo;
const obtenerId = (req, res) => {
    const { ID } = req.params;
    if (!Number.isInteger(Number(ID))) {
        res.status(400).json({ errors: 'El ID debe ser un número entero válido.' });
    }
    return ID;
};
const completarArticulo = (data) => {
    if (data.FECHA_MODIFICACION == null || data.FECHA_MODIFICACION == undefined)
        data.FECHA_MODIFICACION = new Date();
    if (data.ESTADO_ACTIVACION == null || data.ESTADO_ACTIVACION == undefined)
        data.ESTADO_ACTIVACION = true;
};
