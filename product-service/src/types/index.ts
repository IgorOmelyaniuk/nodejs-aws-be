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
