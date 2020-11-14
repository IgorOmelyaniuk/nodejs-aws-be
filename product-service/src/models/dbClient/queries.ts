export const GET_PRODUCTS_QUERY =
  `SELECT p.id, p.title, p.description, p.image, p.price, s.count
  FROM products p INNER JOIN stocks s ON (s.product_id = p.id)`;

export const GET_PRODUCT_QUERY =
  `SELECT p.id, p.title, p.description, p.image, p.price, s.count
  FROM products p INNER JOIN stocks s ON (s.product_id = p.id) WHERE (p.id = $1)
`;

export const ADD_PRODUCT_QUERY = `INSERT INTO products (title, description, image, price)
  VALUES($1, $2, $3, $4) RETURNING *`;

export const ADD_STOCK_QUERY = `INSERT INTO stocks (product_id, count) VALUES($1, $2)`;