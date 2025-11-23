
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'db-container',
  user: 'root',
  password: 'root',
  database: 'contactsdb'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to database');
});

app.post('/add', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO contacts (name, email) VALUES (?, ?)', [name, email], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Contact added');
  });
});

app.get('/list', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(port, () => console.log(`Frontend running on port ${port}`));
