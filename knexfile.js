require('dotenv').config();
const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'db');

function makeConfig(connection) {
  return {
    client: 'pg',
    connection: connection,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
}

let configs = {};
const envs = process.env;
const environments = ['development', 'test', 'production'];

environments.forEach((env) => {
  configs[env] = makeConfig({
    host: envs.DB_HOST,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
  })
})

module.exports = configs;
