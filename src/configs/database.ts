import sequelize, { Sequelize } from "sequelize";

const db = new Sequelize("store_management", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3307
});

export default db;
