// const express = require('express');
// const mysql = require('mysql');
// const app = express();
// const port = 3000;

// const cors = require('cors');
// app.use(cors());
// app.use(express.json());

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 't',
//     database: 'gestion_utilisateurs'
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log('Connecté à MySQL');
// });

// app.get('/api/utilisateurs', (req, res) => {
//     connection.query('SELECT * FROM users', (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// app.post('/api/utilisateurs', (req, res) => {
//     const { nom, email, phone } = req.body;
//     connection.query('INSERT INTO users (nom, email, phone) VALUES (?, ?, ?)', [nom, email, phone], (err, result) => {
//         if (err) throw err;
//         res.status(201).json({ id: result.insertId, nom, email, phone });
//     });
// });

// app.listen(port, () => console.log(`Serveur backend sur : http://localhost:${port}`));


const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 't', //A compléter
    database: 'gestion_utilisateurs' //A compléter
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL.');
    });

// Route pour l'authentification
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Vérification que les champs email et password sont renseignés
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';

    connection.query(query, [email], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        const user = results[0];

        // Comparer le mot de passe hashé avec bcrypt
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                res.json({ message: 'Authentification réussie', userId:user.id });
            } else {
                res.status(401).json({ error: 'Mot de passe incorrect' });
            }
        });
    });
});

//...

app.listen(3000, '0.0.0.0', () => {
    console.log('Serveur actif sur le port 3000');
});
