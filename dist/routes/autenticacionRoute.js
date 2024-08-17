"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacionController_1 = require("../controllers/autenticacionController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Operaciones relacionadas con los artículos
 */
/**
 * @swagger
 * /autenticacion/login/:
 *   post:
 *     tags: [Autenticación]
 *     summary: Inicia sesión con credenciales de usuario.
 *     description: Permite a los usuarios autenticarse y obtener un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *                 description: Correo electrónico del usuario.
 *               contraseña:
 *                 type: string
 *                 example: password123
 *                 description: Contraseña del usuario.
 *             required:
 *               - email
 *               - contraseña
 *     responses:
 *       200:
 *         description: Autenticación exitosa y token JWT generado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Autenticado
 *       401:
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales Invalidas
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.post('/login/', autenticacionController_1.login);
exports.default = router;
