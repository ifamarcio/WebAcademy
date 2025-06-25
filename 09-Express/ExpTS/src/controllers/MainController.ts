import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';
import { getLorem } from '../controllers/LoremController';
router.get('/lorem/:num', getLorem);
export default class MainController {
  static home(_req: Request, res: Response) {
    res.send('<h1>Hello from Express + TS!</h1>');
  }

  static lorem(req: Request, res: Response) {
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
  }

  static hb1(_req: Request, res: Response) {
    res.render('hb1');
  }

  static hb2(_req: Request, res: Response) {
    res.render('hb2');
  }

  static hb3(_req: Request, res: Response) {
    res.render('hb3');
  }

  static hb4(_req: Request, res: Response) {
    const tecnologias = [
      { name: 'Express', type: 'Framework', poweredByNodejs: true },
      { name: 'React', type: 'Biblioteca', poweredByNodejs: false },
      { name: 'NestJS', type: 'Framework', poweredByNodejs: true },
      { name: 'Next.js', type: 'Framework', poweredByNodejs: true },
      { name: 'Laravel', type: 'Framework', poweredByNodejs: false }
    ];

    res.render('hb4', { tecnologias });
  }
}
