import { Request, Response } from 'express';
import { Product } from '../models/product';

let products: Product[] = [
  { id: 1, name: 'Samsung Galaxy S23', price: 3600 },
  { id: 2, name: 'iPhone 14', price: 3500 },
  { id: 3, name: 'Split Samsung Inverter', price: 2990 }
];

export const listProducts = (req: Request, res: Response) => {
  res.render('product/index', { products });
};

export const showCreateForm = (req: Request, res: Response) => {
  res.render('product/create');
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;
  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price)
  };
  products.push(newProduct);
  res.redirect('/products');
};

export const showEditForm = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  res.render('product/edit', { product });
};

export const updateProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;
  const product = products.find(p => p.id === id);
  if (product) {
    product.name = name;
    product.price = Number(price);
  }
  res.redirect('/products');
};

export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  products = products.filter(p => p.id !== id);
  res.redirect('/products');
};
