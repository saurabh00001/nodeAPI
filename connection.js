var mysql = require('mysql');
var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'inspigenius'
});
// Host IP: 162.240.96.135
// DB & USER NAME: remotedbinspizon_db
// PASS: V2tIt{qqyBa)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query('USE inspigenius', (err) => {
        if (err) {
          console.error('Error selecting the database:', err);
          return;
        }
    })
});

module.exports = con;
