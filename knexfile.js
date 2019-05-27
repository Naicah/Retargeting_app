require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;
module.exports = {
  development: {
    client: "pg",
    connection: process.env.CONNECTION,
    migrations: {
      directory: __dirname + "/knex/migrations"
    },
    seeds: {
      directory: __dirname + "/knex/seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.CONNECTION,

    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
