"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const marca_1 = __importDefault(require("./marca"));
class Articulo extends sequelize_1.Model {
}
Articulo.init({
    ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NOMBRE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    FECHA_MODIFICACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    MARCA_ID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'MARCAS',
            key: 'ID',
        },
        allowNull: false,
    },
    ESTADO_ACTIVACION: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'ARTICULOS',
    createdAt: false,
    updatedAt: false,
});
Articulo.belongsTo(marca_1.default, { foreignKey: 'MARCA_ID', as: 'MARCA' });
exports.default = Articulo;
