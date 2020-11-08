import { Client } from 'pg';

import { DBOptions } from './config';
import {
  ADD_PRODUCT_QUERY,
  ADD_STOCK_QUERY,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
} from './queries';
import getError, { ERROR_MESSAGES } from '../../utils/getError';
import { Product, ProductData } from '../../types';

export default class DBClient {
  client: Client;

  constructor(options = DBOptions) {
    this.client = new Client(options);
  }

  async connect() {
    try {
      await this.client.connect();
    } catch (err) {
      const error = getError(ERROR_MESSAGES.DB_FAILED_CONNECTION, err);
      console.log(error);
      throw new Error(error);
    }
  }

  async close() {
    try {
      await this.client.end();
    } catch (err) {
      const error = getError(ERROR_MESSAGES.DB_FAILED_CLOSE, err);
      console.log(error);
      throw new Error(error);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const { rows } = await this.client.query(GET_PRODUCTS_QUERY);
      
      return rows;
    } catch (err) {
      const error = getError(ERROR_MESSAGES.DB_GENERAL_ERROR, err);
      console.log(error);
      throw new Error(error);
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const { rows } = await this.client.query(GET_PRODUCT_QUERY, [id]);
      
      return rows[0];
    } catch (err) {
      const error = getError(ERROR_MESSAGES.DB_GENERAL_ERROR, err);
      console.log(error);
      throw new Error(error);
    }
  }

  async createProduct(product: ProductData): Promise<Product> {
    try {
      await this.client.query('BEGIN');
      const { title, description, image, price, count } = product;
      const data = await this.client.query(ADD_PRODUCT_QUERY, [
        title,
        description,
        image,
        price,
      ]);

      const newProductId = data?.rows?.[0].id;
      await this.client.query(ADD_STOCK_QUERY, [newProductId, count]);
      await this.client.query('COMMIT');

      const { rows } = await this.client.query(GET_PRODUCT_QUERY, [newProductId]);

      return rows[0];
    } catch (err) {
      await this.client.query('ROLLBACK')
      const error = getError(ERROR_MESSAGES.DB_GENERAL_ERROR, err);
      console.log(error);
      throw new Error(error);
    }
  }
}
