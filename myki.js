#!/usr/bin/env node

const repl = require('repl');
const mysql = require('mysql2');
const { table } = require('table');
const util = require('util');

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  rowsAsArray: true
}

const connection = mysql.createConnection(Object.assign({}, config, { rowsAsArray: true }));

const chalk = require('chalk');

function myEval(cmd, context, filename, callback) {
  connection.query(cmd, (err, rows, fields) => {
    if (err) {
      if (!err.fatal) {
	console.log(chalk.red(err.message));
	return;
      } else {
        return callback(err);
      }
    }
    console.log(
      table([fields.map(f => chalk.bold(f.name))].concat(rows.map(r => r.map(c => util.inspect(c, { colors: true })))))
    );
    callback(null);
  });
}

const r = repl.start({ prompt: '> ', eval: myEval });
r.on('exit', () => {
  connection.end();
});
