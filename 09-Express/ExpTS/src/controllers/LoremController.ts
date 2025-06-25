// src/controllers/LoremController.ts
import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

export const getLorem = (req: Request, res: Response) => {
  const num = parseInt(req.params.num || '1');
  const paragraphs = lorem.generateParagraphs(num);
  res.send(`<p>${paragraphs.replace(/\n/g, '</p><p>')}</p>`);
};
