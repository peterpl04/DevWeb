const { createServer } = require('http');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

let app = express();
const http = createServer(app);

process.on('SIGINT', () => http.close((error => {
  if (error) {
    console.error(`${error.name}: ${error.message}`);
  }
  process.exit(error ? 1 : 0);
})));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});


http.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));

