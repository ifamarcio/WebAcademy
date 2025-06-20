import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { engine } from 'express-handlebars';

import validateEnv from './utils/validateEnv';
import loggerMiddleware from './middleware/logger';
import routes from './routes/index.js';

dotenv.config();
validateEnv();

const app = express();
const port = Number(process.env.PORT) || 3333;
const logType = process.env.LOG_TYPE || 'simples';
const logDir = process.env.LOG_DIR || './logs';

// 🧠 Configuração do Handlebars com helper personalizado
app.engine(
  'handlebars',
  engine({
    helpers: {
      ifNode: function (value: boolean, options: any) {
        return value ? options.fn(this) : options.inverse(this);
      }
    }
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.resolve('src', 'views'));

// Middleware
app.use(loggerMiddleware(logType, logDir));

// Rotas
app.use(routes);

// Inicia servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

