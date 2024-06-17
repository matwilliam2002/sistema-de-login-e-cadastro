const mysql = require ('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',     // IP address from the screenshot
    user: 'root',          // Username from the screenshot
    password: 'mateusW2002',   // Replace this with the actual password you are using
    database: 'cad',    // Ensure this matches the database you want to connect to
    port: 3306             // Port from the screenshot
});

connection.connect((err)=>{
    if (err) {
        console.error('Erro de conexão com o MySQL', err);
        return;
    }
    console.log('Conectado ao Mysql.');
})

module.exports = connection;