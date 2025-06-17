import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import fs from 'fs';
import path from 'path';
import loggerMiddleware from './middleware/logger';

// Carrega variáveis de ambiente
dotenv.config();
validateEnv();

const app = express();
const port = process.env.PORT || 3333;
const logType = process.env.LOG_TYPE || 'simples';
const logDir = process.env.LOG_DIR || './logs';

// Middleware de log
app.use(loggerMiddleware(logType, logDir));

// Rota simples
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
