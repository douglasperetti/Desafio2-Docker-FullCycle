const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const pool = mysql.createPool(config);


app.get('/', async (req, res) => {
  const header = '<h1>Full Cycle Rocks!</h1>';
  try {
    await insertPerson('Douglas Fruet Peretti');
    const people = await selectPeople();
    const body = peopleToHtml(people);
    const html = header + body;
    res.send(html);
  } catch (error) {
    console.error('Erro ao obter os dados: ' + error);
    res.status(500).send('Erro ao obter os dados');
  }
})

app.listen(port, async () => {
  await createPeopleTable();
  console.log('Rodando na porta ' + port)
})

function createPeopleTable() {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )`;
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, (error) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  });
}

function insertPerson(name) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO people (name) values (?)`;
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, [name], (error) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  });
}

function selectPeople() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM people';
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });
}

function peopleToHtml(people) {
  let html = '<ul>';
  people.forEach(function (row) {
    html += '<li>' + row.name + '</li>';
  });
  html += '</ul>';
  return html;
}