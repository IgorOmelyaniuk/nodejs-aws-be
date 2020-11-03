import products from '../../mocks/products.json';
import { Product } from '../../types'

export async function getAll(): Promise<Product[]> {
  return  Promise.resolve(products);
}

export async function getById(id: string): Promise<Product> {
  return Promise.resolve(products.find(product => product.id === id));
}
