const fs = require('fs');

const { getConnection } = require('../../../src/api/helper/sqlConnection');

process.env.MYSQL_HOST = '127.0.0.1'
process.env.MYSQL_PORT = '33307'
process.env.MYSQL_USER = 'yaphyll'
process.env.MYSQL_PASS = 'watchtower'
process.env.MYSQL_DB = 'yaphyll_test'

var sql = fs.readFileSync('test/int/shared/db-setup.sql').toString();

start();

async function start() {
  const connection = await getConnection({ multipleStatements:true });
  const result = await connection.query(sql);
  console.log('test db has been setup');
}