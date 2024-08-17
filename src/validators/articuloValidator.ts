import Joi from 'joi';
import { Request, Response } from 'express';
import Marca from '../models/marca';

// Definir el esquema de validación
const articuloSchema = Joi.object({
    NOMBRE: Joi.string().min(3).max(100).required().messages({
        'string.base': 'El nombre debe ser un texto.',
        'string.max': 'El nombre debe tener como máximo 100 caracteres.',
        'any.required': 'El nombre es obligatorio.'
    }),
    FECHA_MODIFICACION: Joi.date().iso().messages({
        'date.iso': 'La fecha de modificacion debe tener un formato válido.'
    }),
    MARCA_ID: Joi.number().integer().positive().required().messages({
        'number.base': 'El ID de marca debe ser un número entero.',
        'number.integer': 'El ID de marca debe ser un número entero.',
        'any.required': 'El ID de marca es obligatorio.'
    }),
    ESTADO_ACTIVACION: Joi.boolean().messages({
        'boolean.base': 'El estado de activacion debe ser verdadero o falso.'
    }),
});

export const validarArticulo = async (req: Request, res: Response) => {
    
    const {NOMBRE , MARCA_ID, FECHA_MODIFICACION, ESTADO_ACTIVACION} = req.body;
    const articulo = {NOMBRE , MARCA_ID, FECHA_MODIFICACION, ESTADO_ACTIVACION};

    const { error: articuloError } = articuloSchema.validate(articulo, { abortEarly: false });

    if (articuloError) {
        const errorMessage = articuloError.details.map(detail => detail.message);
        res.status(400).json({ errors: errorMessage });
    }
    else{
        const marca = await Marca.findByPk(MARCA_ID)
        if(!marca){
            res.status(400).json({ errors: 'No existe la marca seleccionada' });
        }
        else{
            return articulo;
        }
    }

}

