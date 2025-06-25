import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

export const mainController = {
  home: (req: Request, res: Response) => {
    res.send('<h1>Bem-vindo à aplicação Express com TypeScript!</h1>');
  },

  lorem: (req: Request, res: Response) => {
    const qtd = parseInt(req.params.qtd);
    const lorem = new LoremIpsum().generateParagraphs(isNaN(qtd) ? 1 : qtd);
    res.render('lorem', { lorem });
  },

  hb1: (req: Request, res: Response) => {
    res.render('hb1');
  },

  hb2: (req: Request, res: Response) => {
    res.render('hb2');
  },

  hb3: (req: Request, res: Response) => {
    res.render('hb3');
  },

  hb4: (req: Request, res: Response) => {
    const tecnologias = [
      { name: 'Express', type: 'Framework', poweredByNodejs: true },
      { name: 'React', type: 'Library', poweredByNodejs: false },
      { name: 'NestJS', type: 'Framework', poweredByNodejs: true }
    ];
    res.render('hb4', { tecnologias });
  }
};
