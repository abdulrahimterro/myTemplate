const { Sequelize } = require('sequelize');
const { MySql } = require('../../config/index').DataBase;
const sequelize = new Sequelize(MySql.dataBaseName, MySql.userName, MySql.password, {
	dialect: MySql.dialect,
	logging: false,
	define: {
		timestamps: false,
	},
});
module.exports = sequelize;
