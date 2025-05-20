import http from 'http';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createLink } from './util.mjs';

// Determinar __dirname (não existe em ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determina ambiente
const env = process.env.NODE_ENV || 'development';
config({ path: `.env.${env}` });

const dir = process.argv[2] || __dirname;
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(dir, req.url);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<a href="/">Voltar</a><pre>${content}</pre>`);
    return;
  }

  fs.readdir(dir, (err, files) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro ao ler diretório');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    files.forEach(file => {
      res.write(createLink(file));
    });
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
