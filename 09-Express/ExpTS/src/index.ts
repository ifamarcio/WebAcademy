import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import loggerMiddleware from './middleware/logger';
import routes from './routes/index.js';

dotenv.config();
validateEnv();

const app = express();
const port = Number(process.env.PORT) || 3333;
const logType = process.env.LOG_TYPE || 'simples';
const logDir = process.env.LOG_DIR || './logs';

// Middleware de log
app.use(loggerMiddleware(logType, logDir));

// Rotas externas
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
