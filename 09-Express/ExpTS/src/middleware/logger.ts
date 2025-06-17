import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logDir = process.env.LOG_DIR || 'logs';
const logType = process.env.LOG_TYPE || 'simples';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date().toISOString();
  let log = `[${now}] ${req.method} ${req.url}`;

  if (logType === 'completo') {
    const httpVersion = req.httpVersion;
    const userAgent = req.headers['user-agent'] || 'N/A';
    log += ` HTTP/${httpVersion} - ${userAgent}`;
  }

  // Cria pasta de logs se não existir
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logPath = path.join(logDir, 'access.log');

  fs.appendFile(logPath, log + '\n', err => {
    if (err) {
      console.error('Erro ao gravar log:', err);
    }
  });

  next();
};
