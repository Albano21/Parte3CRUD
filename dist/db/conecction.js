"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.MYSQLDB_DATABASE, process.env.MYSQLDB_USER, process.env.MYSQLDB_ROOT_PASSWORD, {
    host: process.env.MYSQLDB_ROOT_HOST //dialect: process.env.DIALECT
});
exports.default = sequelize;
