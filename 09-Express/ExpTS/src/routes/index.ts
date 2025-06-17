import { Router } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('<h1>Hello from Express + TS!</h1>');
});

routes.get('/lorem/:qtd', (req, res) => {
  const qtd = parseInt(req.params.qtd);

  if (isNaN(qtd) || qtd <= 0) {
    return res.status(400).json({ error: 'Informe um número válido de parágrafos.' });
  }

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  const parags = lorem.generateParagraphs(qtd);

  res.send(`<pre>${parags}</pre>`);
});

export default routes;
