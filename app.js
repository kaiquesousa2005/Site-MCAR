require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { Pool } = require('pg');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://site-mcar.vercel.app' // substitua pelo domínio público do seu site na Vercel
}));

app.use(bodyParser.json());


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


app.post('/contato', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO contato (nome, email, mensagem) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, mensagem]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);  // Melhor logging para o console
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }    
});

app.post('/simulacao', async (req, res) => {
    const { nomeCompleto, dataNascimento, cpf, carroInteresse, possuiCnh, whatsapp, mensagem} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO simulacao (nome_completo, data_nascimento, cpf, carro_interesse, possui_cnh, whatsapp, mensagem) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nomeCompleto, dataNascimento, cpf, carroInteresse, possuiCnh, whatsapp, mensagem]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
    }
});

// Adicionando rotas GET para /contato e /simulacao
app.get('/contato', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contato');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/simulacao', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM simulacao');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
