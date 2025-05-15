
const http = require('http');
const fs = require('fs');
const path = require('path');

// Lê o diretório passado como argumento
const dir = process.argv[2] || __dirname;

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

server.listen(3333, () => {
  console.log(`Servidor rodando em http://localhost:3333`);
});
