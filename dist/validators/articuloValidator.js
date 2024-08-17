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
exports.validarArticulo = void 0;
const joi_1 = __importDefault(require("joi"));
const marca_1 = __importDefault(require("../models/marca"));
// Definir el esquema de validación
const articuloSchema = joi_1.default.object({
    NOMBRE: joi_1.default.string().min(3).max(100).required().messages({
        'string.base': 'El nombre debe ser un texto.',
        'string.max': 'El nombre debe tener como máximo 100 caracteres.',
        'any.required': 'El nombre es obligatorio.'
    }),
    FECHA_MODIFICACION: joi_1.default.date().iso().messages({
        'date.iso': 'La fecha de modificacion debe tener un formato válido.'
    }),
    MARCA_ID: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'El ID de marca debe ser un número entero.',
        'number.integer': 'El ID de marca debe ser un número entero.',
        'any.required': 'El ID de marca es obligatorio.'
    }),
    ESTADO_ACTIVACION: joi_1.default.boolean().messages({
        'boolean.base': 'El estado de activacion debe ser verdadero o falso.'
    }),
});
const validarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { NOMBRE, MARCA_ID, FECHA_MODIFICACION, ESTADO_ACTIVACION } = req.body;
    const articulo = { NOMBRE, MARCA_ID, FECHA_MODIFICACION, ESTADO_ACTIVACION };
    const { error: articuloError } = articuloSchema.validate(articulo, { abortEarly: false });
    if (articuloError) {
        const errorMessage = articuloError.details.map(detail => detail.message);
        res.status(400).json({ errors: errorMessage });
    }
    else {
        const marca = yield marca_1.default.findByPk(MARCA_ID);
        if (!marca) {
            res.status(400).json({ errors: 'No existe la marca seleccionada' });
        }
        else {
            return articulo;
        }
    }
});
exports.validarArticulo = validarArticulo;
