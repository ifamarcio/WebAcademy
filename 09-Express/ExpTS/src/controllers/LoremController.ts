import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

export const home = (req: Request, res: Response) => {
  res.send('Hello World!');
};

export const lorem = (req: Request, res: Response) => {
  const paragraphs = parseInt(req.params.qtd) || 1;

  const lorem = new LoremIpsum();
  const result = Array(paragraphs).fill(null).map(() => `<p>${lorem.generateParagraphs(1)}</p>`).join('');

  res.send(result);
};

export const hb1 = (req: Request, res: Response) => {
  res.render('hb1', { title: 'Página HB1' });
};

export const hb2 = (req: Request, res: Response) => {
  res.render('hb2', { name: 'Usuário', year: new Date().getFullYear() });
};

export const hb3 = (req: Request, res: Response) => {
  const fruits = ['Maçã', 'Banana', 'Laranja'];
  res.render('hb3', { fruits });
};

export const hb4 = (req: Request, res: Response) => {
  const tecnologias = [
    { name: 'Node.js', type: 'runtime', poweredByNodejs: true },
    { name: 'Express', type: 'framework', poweredByNodejs: true },
    { name: 'React', type: 'frontend', poweredByNodejs: false },
  ];

  res.render('hb4', { tecnologias });
};
