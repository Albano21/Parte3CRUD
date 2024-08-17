import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req, res, next: Function) => {

    if(!req.cookies){
        return res.status(401).json({ message: 'Sin token, autorizacion denegada' });
    }

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Sin token, autorizacion denegada' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Token invalido' });
    }
};