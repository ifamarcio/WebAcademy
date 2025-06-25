export interface Product {
  id: number;
  name: string;
  price: number;
}

export const products: Product[] = [
  { id: 1, name: 'Celular Samsung Galaxy S23', price: 3000 },
  { id: 2, name: 'Notebook Dell XPS 14', price: 4500 },
];
