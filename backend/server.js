const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 't',
    database: 'gestion_utilisateurs'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connecté à MySQL');
});

app.get('/api/utilisateurs', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/utilisateurs', (req, res) => {
    const { nom, email, phone } = req.body;
    connection.query('INSERT INTO users (nom, email, phone) VALUES (?, ?, ?)', [nom, email, phone], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, nom, email, phone });
    });
});

app.listen(port, () => console.log(`Serveur backend sur : http://localhost:${port}`));
