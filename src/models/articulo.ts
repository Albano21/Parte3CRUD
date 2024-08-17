import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';
import Marca from './marca';

/**
 * @swagger
 * components:
 *   schemas:
 *     Articulo:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: El ID único del artículo
 *           example: 1
 *         NOMBRE:
 *           type: string
 *           description: El nombre del artículo
 *           example: "Zapatos Deportivos"
 *         FECHA_MODIFICACION:
 *           type: string
 *           format: date-time
 *           description: La fecha de última modificación del artículo
 *           example: "2024-08-15 00:00:00.000 +00:00"
 *         ESTADO_ACTIVACION:
 *           type: boolean
 *           description: El estado de activación del artículo
 *           example: true
 *         MARCA:
 *           type: object
 *           properties:
 *             NOMBRE:
 *               type: string
 *               description: El nombre de la marca asociada
 *               example: "Nike"
 *       required:
 *         - NOMBRE
 *         - FECHA_MODIFICACION
 *         - MARCA_ID
 *         - ESTADO_ACTIVACION
 */
interface ArticuloAttributes {
    ID: number;
    NOMBRE: string;
    FECHA_MODIFICACION: Date;
    MARCA_ID: number;
    ESTADO_ACTIVACION: boolean;
}

interface ArticuloCreationAttributes extends Optional<ArticuloAttributes, 'ID'> {}

class Articulo extends Model<ArticuloAttributes, ArticuloCreationAttributes>
    implements ArticuloAttributes {
    public ID!: number;
    public NOMBRE!: string;
    public FECHA_MODIFICACION!: Date;
    public MARCA_ID!: number;
    public ESTADO_ACTIVACION!: boolean;
}

Articulo.init(
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NOMBRE: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FECHA_MODIFICACION: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        MARCA_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'MARCAS',
                key: 'ID',
            },
            allowNull: false,
        },
        ESTADO_ACTIVACION: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'ARTICULOS',
        createdAt: false,
        updatedAt: false,
    }
);

Articulo.belongsTo(Marca, { foreignKey: 'MARCA_ID', as: 'MARCA' });

export default Articulo;
