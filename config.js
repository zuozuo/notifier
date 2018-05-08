const test = {
  database: {
    port: '5432',
    host: 'localhost',
    username: 'zuozuo',
    password: 'password',
    name: 'notifier_test'
  }
}

const development = {
  database: {
    port: '5432',
    host: 'localhost',
    username: 'zuozuo',
    password: 'password',
    name: 'notifier_development'
  }
}

function databaseConnection(env) {
  let c = this[env].database
  return `postgres://${c.username}:${c.password}@${c.host}:${c.port}/${c.name}`
}

module.exports = {
  test,
  development,
  databaseConnection
}
