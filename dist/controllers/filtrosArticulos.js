"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerFiltros = obtenerFiltros;
const sequelize_1 = require("sequelize");
function obtenerFiltros(data) {
    const { NOMBRE, ESTADO_ACTIVACION } = data;
    const where = {};
    if (NOMBRE) {
        where.NOMBRE = { [sequelize_1.Op.like]: `%${NOMBRE}%` }; // Búsqueda de coincidencia parcial
    }
    if (ESTADO_ACTIVACION !== undefined) {
        where.ESTADO_ACTIVACION = ESTADO_ACTIVACION === 'true';
    }
    return where;
}
