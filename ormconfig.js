const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  type: "mysql",
  username: process.env.USER_DB,
  password: process.env.PASS_DB,
  connectString: `(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = ${process.env.HOST_DB})(PORT = ${process.env.PORT_DB})))(CONNECT_DATA = (SERVER=dedicated)(SERVICE_NAME=${process.env.SERVICE_NAME_DB})))`,
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [isDevelopment ? "src/entities/*.ts" : "dist/entities/*.js"],
  migrations: [isDevelopment ? "src/migrations/*.ts" : "dist/migrations/*.js"],
  cli: {
    entitiesDir: isDevelopment ? "src/entities" : "dist/entities",
    migrationsDir: isDevelopment ? "src/migrations" : "dist/migrations",
  },
};
