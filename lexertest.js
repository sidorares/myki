const MySQL = require('sql-lexer').MySQL;

const L = new MySQL.Lex()

L.pipe(new MySQL.Colorize())
  .pipe(process.stdout);

//L.on('data', e => console.log(e))

L.write('SELECT error# 1 + 1 as test')

L.end()
