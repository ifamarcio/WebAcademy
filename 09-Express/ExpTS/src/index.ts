import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import validateEnv from './utils/validateEnv';
import loggerMiddleware from './middleware/logger';
import routes from './routes/index.js';
import path from 'path';

dotenv.config();
validateEnv();

const app = express();
const port = Number(process.env.PORT) || 3333;
const logType = process.env.LOG_TYPE || 'simples';
const logDir = process.env.LOG_DIR || './logs';

// View engine Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve('src', 'views'));

// Middleware de log
app.use(loggerMiddleware(logType, logDir));

// Rotas
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
