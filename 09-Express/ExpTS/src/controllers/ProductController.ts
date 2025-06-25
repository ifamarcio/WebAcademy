import { Request, Response } from 'express';
import { products, Product } from '../models/Product';

export const listProducts = (req: Request, res: Response) => {
  res.render('products', { products });
};

export const showForm = (req: Request, res: Response) => {
  res.render('productForm');
};

export const addProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;
  const id = products.length + 1;
  products.push({ id, name, price: Number(price) });
  res.redirect('/products');
};

export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) products.splice(index, 1);
  res.redirect('/products');
};
