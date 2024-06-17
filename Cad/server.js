const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./dbConnection');

const app = express();

// Middleware para interpretar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Permitir requisições deste domínio
    methods: ['GET', 'POST', 'OPTIONS'], // Métodos que serão permitidos
    allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
}));

// Tratamento para todas as opções (cobre todas as rotas)
app.options('*', cors());

// Rota para cadastrar um usuário
app.post('/pages/signUP', (req, res) => {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios' });
    }

    const sql = 'INSERT INTO usuarios (name, lastName, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, lastName, email, password], (err, result) => {
        if (err) {
            console.error('Erro ao executar a query', err);
            return res.status(500).json({ error: err.message });
        } else {
            console.log('Usuário cadastrado com sucesso.');
            return res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
        }
    });
});

// Rota para autenticar o usuário
app.post('/pages/index', (req, res) => {
    const { usuario, senha } = req.body;

    // Validação básica das entradas
    if (!usuario || !senha) {
        return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios' });
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    db.query(sql, [usuario, senha], (error, results) => {
        if (error) {
            console.error('Erro ao executar a consulta', error);
            return res.status(500).json({ success: false, message: 'Erro ao autenticar o usuário' });
        }

        if (results.length > 0) {
            console.log('Autenticação bem-sucedida para o usuário:', usuario);
            return res.json({ success: true });
        } else {
            console.log('Credenciais inválidas para o usuário:', usuario);
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    });
});

const PORT = process.env.PORT || 3000; // Define a porta do servidor (padrão 3000)
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Mensagem de confirmação
});
