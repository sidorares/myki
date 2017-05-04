const colorReadline = require('./rl');
const MySQL = require('sql-lexer').MySQL;
const bl = require('bl');

var repl = colorReadline.createInterface({
  input: process.stdin,
  output: process.stdout,
  colorize: function(str, cb) {
    //return cb(null, str);
    const L = new MySQL.Lex();
    L.pipe(new MySQL.Colorize()).pipe(
      bl((err, text) => {
        cb(null, text.toString());
      })
    );
    L.write(str);
    L.end();
  }
});

repl.on('line', function(cmd) {
  console.log('LINE:', cmd);
});

repl.prompt();
