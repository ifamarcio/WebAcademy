const http = require('http');
const fs = require('fs');
const path = require('path');
const { createLink } = require('./util');

// Determina o ambiente: development ou production
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });

const dir = process.argv[2] || __dirname;
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(dir, req.url);

  // Se estiver acessando um arquivo (ex: /nodejs.txt)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<a href="/">Voltar</a><pre>${content}</pre>`);
    return;
  }

  // Senão, mostra os links
  fs.readdir(dir, (err, files) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Erro ao ler diretório');
      return;
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    files.forEach(file => {
      res.write(createLink(file));
    });
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
