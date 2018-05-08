const config = require('./config');
const database = require('./src/db/database');

database.create(config.test.database.name)
database.create(config.development.database.name)
