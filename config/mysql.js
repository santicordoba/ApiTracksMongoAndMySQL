const { Sequelize } = require("sequelize");

const NODE_ENV = process.env.NODE_ENV;

const database = (NODE_ENV === 'test') ? process.env.MYSQL_DB_TEST : process.env.MYSQL_DB;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const dbConnectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");
  } catch (e) {
    console.log("MySQL ERROR connected", e);
  }
};

module.exports = { sequelize, dbConnectMySQL };