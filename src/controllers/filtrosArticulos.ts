import { Request } from 'express';
import { Op } from 'sequelize';

export function obtenerFiltros(data) {
    const { NOMBRE, ESTADO_ACTIVACION }: { NOMBRE?: string; ESTADO_ACTIVACION? } = data;

    const where: any = {};

    if (NOMBRE) {
        where.NOMBRE = { [Op.like]: `%${NOMBRE}%` }; // Búsqueda de coincidencia parcial
    }
  
    if (ESTADO_ACTIVACION !== undefined) {
        where.ESTADO_ACTIVACION = ESTADO_ACTIVACION === 'true';
    }

    return where;
}