export enum ERROR_MESSAGES {
  DB_FAILED_CONNECTION = 'Failed connection to database',
  DB_FAILED_CLOSE = 'Failed closing connection to database',
  DB_GENERAL_ERROR = 'Database error',
  PRODUCTS_NOT_FOUND = 'Products are not found',
  PRODUCT_NOT_FOUND = 'Not found product with id',
  PRODUCT_NOT_VALID = 'Error for product creation. Product data is not valid',
  PRODUCT_ID_NOT_VALID = 'Error for getting product. Id is not valid',
  PRODUCT_NOT_CREATED = 'Product is not created',
  INTERNAL_SERVER_ERROR=  'Internal server error',
}

export default (message: ERROR_MESSAGES, error: Error) =>
  (`${message}, ${JSON.stringify(error)} `);