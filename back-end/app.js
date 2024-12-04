const express = require('express');
const cors = require('cors'); 
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configura o CORS para permitir acesso do front-end na porta 3000
app.use(cors({
    origin: 'http://localhost:3000' // Origem do front-end
}));

app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Rota para buscar todos os contatos
app.get('/contatos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contato ORDER BY id DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.status(500).json({ message: 'Erro ao buscar contatos' });
    }
});

// Rota para buscar todas as simulações
app.get('/simulacoes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM simulacao ORDER BY id DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar simulações:', error);
        res.status(500).json({ message: 'Erro ao buscar simulações' });
    }
});

//POST DO CONTATO
app.post('/contato', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO contato (nome, email, mensagem) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, mensagem]
        );
        res.status(200).json({ message: 'Mensagem enviada com sucesso!', data: result.rows[0] });
    } catch (error) {
        console.error('Erro ao salvar contato:', error);
        res.status(500).json({ message: 'Erro ao salvar contato. Tente novamente mais tarde.' });
    }
});

//POST DA SIMULAÇÃO
app.post('/simulacao', async (req, res) => {
    const { nomeCompleto, dataNascimento, cpf, carroInteresse, possuiCnh, whatsapp, mensagem } = req.body;

    try {
        const query = `
        INSERT INTO simulacao (nome_completo, data_nascimento, cpf, carro_interesse, possui_cnh, whatsapp, mensagem)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
        const values = [nomeCompleto, dataNascimento, cpf, carroInteresse, possuiCnh, whatsapp, mensagem];
        const result = await pool.query(query, values);

        res.status(201).json({ message: 'Simulação salva com sucesso!', simulacao: result.rows[0] });
    } catch (error) {
        console.error('Erro ao salvar simulação:', error);
        res.status(500).json({ message: 'Erro ao salvar simulação' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
