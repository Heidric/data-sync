const config = require('../config.js');
const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
const db = {};

let sequelize;
const sqlConf = {
  ...config,
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  timezone: '+03:00',
  logging: false,
  pool: {
    max: 25,
    idle: 1000 * 60
  }
};

sequelize = new Sequelize(config.database, config.username, config.password, sqlConf);

db.CarData = require('./car-data')(sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
