const express = require('express');
const cors = require('cors'); 
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configura o CORS para permitir acesso do front-end
app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://site-mcar.vercel.app/' // Defina a URL do front-end no Railway ou deixe '*' para permitir todas as origens
}));

app.use(express.json());

// Configura a conexão com o PostgreSQL usando DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Variável fornecida pelo Railway
    ssl: {
        rejectUnauthorized: false // Necessário para conexão segura no Railway
    }
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

// POST DO CONTATO
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

// POST DA SIMULAÇÃO
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

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
