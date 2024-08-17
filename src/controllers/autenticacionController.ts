import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

export const login =  async (req: Request, res: Response) => {
    const { email, contraseña } = req.body;

    if(!email || !contraseña){
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

        const salt = await bcrypt.genSalt(12);
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);

        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales Invalidas' });
        }

        const payload = { user: { id: usuario.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
            if (err) throw err;

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 2 * 60 * 60 * 1000
            });

            return res.json({ message: 'Autenticado' });

        });
    }   catch (e) {
        console.error(e.message);
        return res.status(500).send('Server error');
    }   
}