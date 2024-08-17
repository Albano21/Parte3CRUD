const path = require('path');
import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT as Dialect,
    storage: process.env.SQLITEDB_DATABASE, 
    logging: false, 
  });

export default sequelize;