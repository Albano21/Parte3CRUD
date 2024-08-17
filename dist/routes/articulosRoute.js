"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulosController_1 = require("../controllers/articulosController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Artículos
 *   description: Operaciones relacionadas con los artículos
 */
/**
 * @swagger
 * /articulos/:
 *   get:
 *     tags: [Artículos]
 *     summary: Obtiene una lista de artículos
 *     parameters:
 *       - name: NOMBRE
 *         in: query
 *         description: Nombre del artículo para filtrar
 *         required: false
 *         schema:
 *           type: string
 *       - name: ESTADO_ACTIVACION
 *         in: query
 *         description: Estado de activación del artículo para filtrar
 *         required: false
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista de artículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articulo'
 *       500:
 *         description: Error al obtener los artículos
 */
router.get('/', articulosController_1.listadoArticulos);
/**
 * @swagger
 * /articulos/{ID}:
 *   get:
 *     tags: [Artículos]
 *     summary: Busca un artículo por ID
 *     parameters:
 *       - name: ID
 *         in: path
 *         description: ID del artículo a buscar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       404:
 *         description: Artículo no encontrado
 *       500:
 *         description: Error al buscar el artículo
 */
router.get('/:ID', articulosController_1.buscarArticulo);
/**
 * @swagger
 * /articulos/:
 *   post:
 *     tags: [Artículos]
 *     summary: Registra un nuevo artículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Articulo'
 *     responses:
 *       201:
 *         description: Artículo registrado exitosamente
 *       400:
 *         description: Errores en Campos
 *       500:
 *         description: Error al registrar el artículo
 */
router.post('/', articulosController_1.registrarArticulo);
/**
 * @swagger
 * /articulos/{ID}:
 *   delete:
 *     tags: [Artículos]
 *     summary: Elimina un artículo por ID
 *     parameters:
 *       - name: ID
 *         in: path
 *         description: ID del artículo a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artículo eliminado exitosamente
 *       404:
 *         description: Artículo no encontrado
 *       500:
 *         description: Error al eliminar el artículo
 */
router.delete('/:ID', articulosController_1.borrarArticulo);
/**
 * @swagger
 * /articulos/{ID}:
 *   put:
 *     tags: [Artículos]
 *     summary: Modifica un artículo por ID
 *     parameters:
 *       - name: ID
 *         in: path
 *         description: ID del artículo a modificar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Articulo'
 *     responses:
 *       200:
 *         description: Artículo modificado exitosamente
 *       400:
 *         description: Errores en Campos
 *       404:
 *         description: Artículo no encontrado
 *       500:
 *         description: Error al modificar el artículo
 */
router.put("/:ID", articulosController_1.modificarArticulo);
exports.default = router;
