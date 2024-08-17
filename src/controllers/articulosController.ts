import { Request, Response } from 'express';
import sequelize from "../db/connection";
import Articulo from '../models/articulo';
import { obtenerFiltros } from './filtrosArticulos';
import Marca from '../models/marca';
import { validarArticulo } from '../validators/articuloValidator';


export const listadoArticulos = async (req: Request, res: Response) => {
    try{
        await sequelize.authenticate();

        const where = obtenerFiltros(req.query)
        
        const articulos = await Articulo.findAll({
            attributes: ['ID', 'NOMBRE', 'FECHA_MODIFICACION', 'ESTADO_ACTIVACION'],
            order: [
                ['NOMBRE', 'ASC']
            ],
            where,
            include: [
                {
                    model: Marca,
                    attributes: ['NOMBRE'],
                    as: 'MARCA'
                }
            ]
        });

        return res.json(articulos);
    }
    catch(err){
        return res.status(500).json({ errors: 'Error al obtener los artículos.' });
    }
}

export const buscarArticulo = async (req: Request, res: Response) => {
    try{
        await sequelize.authenticate();

        const ID = obtenerId(req, res);

        const articulo = await Articulo.findByPk(ID,{
            attributes: ['ID', 'NOMBRE', 'FECHA_MODIFICACION', 'ESTADO_ACTIVACION'],
            include: [
                {
                    model: Marca,
                    attributes: ['NOMBRE'],
                    as: 'MARCA'
                }
            ]
        })

        if(articulo && articulo.ESTADO_ACTIVACION == true){
            return res.status(200).json(articulo);
        }
        else{
            return res.status(404).json({ errors: 'Artículo no encontrado.' });
        }
    }
    catch(err){
        if (!res.headersSent){
            return res.status(500).json({ errors: 'Error al buscar el artículo.' });
        }
    }
}

export const registrarArticulo = async (req: Request, res: Response) => {
    try{
        await sequelize.authenticate();

        const articuloData = await validarArticulo(req, res);
        
        completarArticulo(articuloData);

        await Articulo.create(articuloData);

        return res.status(201).json({ message: 'Registro de artículo exitoso.' });

    }
    catch(err){
        if (!res.headersSent){
            return res.status(500).json({ errors: 'Error al registrar el artículo.' });
        }
    }
}

export const borrarArticulo = async (req: Request, res: Response) => {
    try{
        await sequelize.authenticate();

        const ID = obtenerId(req, res);

        const articulo = await Articulo.findByPk(ID);

        if(articulo && articulo.ESTADO_ACTIVACION == true){
            articulo.update({ESTADO_ACTIVACION : false})
            return res.status(200).json({ message: 'Artículo eliminado exitosamente'});
        }
        else{
            return res.status(404).json({ errors: 'Artículo no encontrado.' });
        }

    }
    catch(err){
        if (!res.headersSent){
            return res.status(500).json({ errors: 'Error al eliminar el artículo.' });
        }
    }
}

export const modificarArticulo = async (req: Request, res: Response) => {
    try{
        await sequelize.authenticate();

        const ID = obtenerId(req, res);

        const articuloData = await validarArticulo(req, res);

        completarArticulo(articuloData);

        const articulo = await Articulo.findByPk(ID);

        if(articulo){
            articulo.update(articuloData)
            return res.status(200).json({ message: 'Artículo modificado exitosamente'});
        }
        else{
            return res.status(404).json({ errors: 'Artículo no encontrado.' });
        }

    }
    catch(err){
        if (!res.headersSent){
            return res.status(500).json({ errors: 'Error al modificar el artículo.' });
        }
    }
}

const obtenerId = (req: Request, res: Response) => {
    const {ID} = req.params;
    if (!Number.isInteger(Number(ID))) {
        res.status(400).json({ errors: 'El ID debe ser un número entero válido.' });
    }
    return ID;
}

const completarArticulo = (data) => {
    if(data.FECHA_MODIFICACION == null || data.FECHA_MODIFICACION == undefined) data.FECHA_MODIFICACION = new Date();
    if(data.ESTADO_ACTIVACION == null || data.ESTADO_ACTIVACION == undefined) data.ESTADO_ACTIVACION = true;
}