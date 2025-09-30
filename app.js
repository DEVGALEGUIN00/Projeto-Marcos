const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public'))); // Para servir arquivos estáticos
app.use(express.urlencoded({ extended: true }));

let users = [
    { username: 'usuario1', password: 'senha1' },
    { username: 'usuario2', password: 'senha2' }
];

let currentUser = null;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        return res.redirect('/dashboard');
    } else {
        return res.send('Credenciais inválidas!');
    }
});

app.get('/dashboard', (req, res) => {
    if (!currentUser) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.post('/logout', (req, res) => {
    currentUser = null;
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
