const Sequelize = require('sequelize');
const url = require('url');
const usersModel = require('./models/user');
const authtokensModel = require('./models/authtokens');


var hostname = 'db';
var username = 'user';
var password = 'password';
var database = 'clproject';
var port = 5432;

console.log('DATABASE_URL: ' + process.env.DATABASE_URL);

databaseUrl = process.env.DATABASE_URL || '';
if (databaseUrl != '') {
  const parsedDatabaseUrl = url.parse(databaseUrl);
  hostname = parsedDatabaseUrl.hostname;
  username = parsedDatabaseUrl.username;
  password = parsedDatabaseUrl.password;
  database = parsedDatabaseUrl.pathname;
  port = parsedDatabaseUrl.port;
  console.log('hostname: ' + hostname);
  console.log('username: ' + username);
  console.log('password: ' + password);
  console.log('pathname: ' + pathname);
  console.log('port: ' + port);
}

const sequelize = new Sequelize(database, username, password, {
  port: port,
  host: hostname,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

var users = usersModel(sequelize);
var authtokens = authtokensModel(sequelize);

module.exports = {
  users: users,
  authtokens: authtokens
};
