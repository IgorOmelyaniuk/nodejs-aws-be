CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

-- Create Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text not null,
  description text,
  image text,
  price integer
) 

-- Create Stocks table
CREATE TABLE IF NOT EXISTS stocks (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid,
  count integer,
  foreign key ("product_id") references "products" ("id")
)