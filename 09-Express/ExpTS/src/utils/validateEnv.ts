import dotenv from 'dotenv';

dotenv.config();

export function validateEnv(): void {
  if (!process.env.PORT) {
    console.error('❌ ERRO: A variável de ambiente PORT não está definida no arquivo .env');
    process.exit(1);
  }

  const port = Number(process.env.PORT);

  if (isNaN(port)) {
    console.error('❌ ERRO: A variável PORT precisa ser um número válido.');
    process.exit(1);
  }
}
