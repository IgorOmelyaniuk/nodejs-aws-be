import products from '../../mocks/products.json';

export async function getAll(): Promise<any[]> {
  return products;
}

export async function getById(id: string): Promise<any> {
  return products.find(product => product.id === id);
}
