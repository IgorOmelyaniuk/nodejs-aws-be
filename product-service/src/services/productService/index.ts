import { Product, ProductData } from '../../types'

import DbClient from '../../models/dbClient';

export async function getAll(): Promise<Product[]> {
  const client = new DbClient();
  try {
    await client.connect();
  
    return await client.getAllProducts();
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

export async function getById(id: string): Promise<Product> {
  const client = new DbClient();
  try {
    await client.connect();

    return await client.getProductById(id);
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

export async function create(productData: ProductData): Promise<Product> {
  const client = new DbClient();
  try {
    await client.connect();

    return await client.createProduct(productData);
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}
