import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

/**
 * @swagger
 * components:
 *   schemas:
 *     Marca:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: El ID único de la marca
 *           example: 1
 *         NOMBRE:
 *           type: string
 *           description: El nombre de la marca
 *           example: "Nike"
 *       required:
 *         - NOMBRE
 */

interface MarcaAttributes {
    ID: number;
    NOMBRE: string;
}

interface MarcaCreationAttributes extends Optional<MarcaAttributes, 'ID'> {}

class Marca extends Model<MarcaAttributes, MarcaCreationAttributes>
    implements MarcaAttributes {
    public ID!: number;
    public NOMBRE!: string;
}

Marca.init(
    {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        NOMBRE: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'MARCAS',
        createdAt: false,
        updatedAt: false,
    }
);

export default Marca;
