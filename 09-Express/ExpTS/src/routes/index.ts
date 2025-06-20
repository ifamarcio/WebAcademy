import { Router } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('<h1>Hello from Express + TS!</h1>');
});

routes.get('/lorem/:qtd', (req, res) => {
  const qtd = parseInt(req.params.qtd);
  if (isNaN(qtd) || qtd <= 0) {
    return res.status(400).json({ error: 'Informe um número válido.' });
  }

  const lorem = new LoremIpsum({
    sentencesPerParagraph: { max: 8, min: 4 },
    wordsPerSentence: { max: 16, min: 4 }
  });

  const texto = lorem.generateParagraphs(qtd);
  res.send(`<pre>${texto}</pre>`);
});

// Handlebars: hb1, hb2, hb3
routes.get('/hb1', (_req, res) => res.render('hb1'));
routes.get('/hb2', (_req, res) => res.render('hb2'));
routes.get('/hb3', (_req, res) => res.render('hb3'));

// ✅ NOVA ROTA HB4 com helper
routes.get('/hb4', (_req, res) => {
  const tecnologias = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'React', type: 'Biblioteca', poweredByNodejs: false },
    { name: 'NestJS', type: 'Framework', poweredByNodejs: true },
    { name: 'Next.js', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false }
  ];

  res.render('hb4', { tecnologias });
});

export default routes;
