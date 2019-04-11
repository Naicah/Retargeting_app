const pg = require('pg')
pg.defaults.ssl = true
  module.exports = {
    development: {
      client: 'pg',
      connection: 'postgresql://upanmcxpnhjccb:f65b486e3811955de2f4340815841e545bef22c345549223de2861e6b6332c6b@ec2-79-125-2-142.eu-west-1.compute.amazonaws.com/d5ic3hi5l3kgqv'
      ,migrations: {
        directory: __dirname + '/knex/migrations',
      },
      seeds: {
        directory: __dirname + '/knex/seeds'
      }
      //migrate-make init
      //ENV FIL connection = process database:dsn

    },

    production: {
      client: 'pg',
      connection: 'postgresql://upanmcxpnhjccb:f65b486e3811955de2f4340815841e545bef22c345549223de2861e6b6332c6b@ec2-79-125-2-142.eu-west-1.compute.amazonaws.com/d5ic3hi5l3kgqv',

      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  }