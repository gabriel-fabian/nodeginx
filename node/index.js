const express = require('express');

const app = express()
const port = 3000
const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query(`CREATE TABLE IF NOT EXISTS people(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`);
connection.query(`INSERT INTO people(name) values('Fabian')`);
connection.query(`INSERT INTO people(name) values('João')`);

app.get('/', (req, res) => {
  connection.query("SELECT * FROM people", function(err, results, _fields) {
    if (err) throw err;

    peopleEntry = results.map(entry => ' ' + entry.name)

    res.send('<h1>Full Cycle Rocks!</h1> ' + peopleEntry)
  });
})

app.listen(port, () => {
  console.log('rodando na porta ' + port)
})