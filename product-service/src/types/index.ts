import * as Yup from 'yup';

export interface Product {
  id: string,
  title: string,
  description: string,
  price: number,
  image: string;
};

export interface ProductData extends Omit<Product, 'id'> {
  count: number;
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  image: Yup.string().url(),
  price: Yup.number().positive().required(),
  count: Yup.number().positive().required(),
});