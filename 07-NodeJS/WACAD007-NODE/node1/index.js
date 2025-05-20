const http = require('http');
const fs = require('fs');
const path = require('path');

// Determina o ambiente: development ou production
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });

const dir = process.argv[2] || __dirname;
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Erro ao ler diretório');
      return;
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<ul>');
    files.forEach(file => {
      res.write(`<li>${file}</li>`);
    });
    res.write('</ul>');
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
