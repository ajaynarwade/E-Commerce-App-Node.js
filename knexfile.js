require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'mydb',
      port: process.env.DB_PORT || 5432,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
    pool: { min: 2, max: 10 },
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.STAGING_DB_HOST || 'staging_host',
      user: process.env.STAGING_DB_USER || 'staging_user',
      password: process.env.STAGING_DB_PASS || 'staging_password',
      database: process.env.STAGING_DB_NAME || 'staging_db',
      port: process.env.STAGING_DB_PORT || 5432,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.PROD_DB_HOST || 'production_host',
      user: process.env.PROD_DB_USER || 'production_user',
      password: process.env.PROD_DB_PASS || 'production_password',
      database: process.env.PROD_DB_NAME || 'production_db',
      port: process.env.PROD_DB_PORT || 5432,
    },
    pool: { min: 2, max: 20 },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
