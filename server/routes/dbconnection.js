var mysql = require('mysql');
var config = require('config');
var connection = mysql.createPool({
  // host: '10.132.33.172',
  // user: 'root',
  // password: 'redhat',
  // database: 'hmis'

  host: config.get("db.host"),//here host denote host name
  user : config.get("db.user"),
  password: config.get("db.password"),
  database: config.get("db.database"),


});
module.exports = connection;
