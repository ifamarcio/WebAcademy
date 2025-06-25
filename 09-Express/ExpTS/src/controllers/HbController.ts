// src/controllers/HbController.ts
import { Request, Response } from 'express';

export const hb1 = (req: Request, res: Response) => {
  res.render('hb1', { titulo: 'Página HB1' });
};

export const hb2 = (req: Request, res: Response) => {
  res.render('hb2', { subtitulo: 'Conteúdo HB2' });
};

export const hb3 = (req: Request, res: Response) => {
  res.render('hb3', { lista: ['item 1', 'item 2', 'item 3'] });
};
