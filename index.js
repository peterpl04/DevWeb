const { createServer } = require('http');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

let app = express();

const http = createServer(app);

app.use(bodyParser.json());

// Corrigido de 'SIGNINT' para 'SIGINT'
process.on('SIGINT', () => http.close((error) => {
    if (error) {
        console.error(`${error.name} : ${error.message}`);
    }

    process.exit(error ? 1 : 0);
}));

app.get('/', (_, res) => res.send('<h1>Teste atividade</h1>'));

app.post('/', function (req, res) {
    const nome = req.body.nome;
    //console.log(req.body);
    res.send(`Ola ${nome}!`);
});


app.post('/moretto', function (req, res) {
    const nome = req.body.nome;
    if (!nome) {
        return res.status(400).json({ erro: 'Nome é obrigatório!' });
    }

    res.status(200).json({mensagem: `Olá ${nome}!`})
});


const PORT = process.env.PORT || 8081; // Escolha uma porta diferente
http.listen(PORT, () => console.log(`Servidor rodando :) na porta ${PORT}`));
