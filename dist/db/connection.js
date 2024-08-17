"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.SQLITEDB_DATABASE,
    logging: false,
});
exports.default = sequelize;
