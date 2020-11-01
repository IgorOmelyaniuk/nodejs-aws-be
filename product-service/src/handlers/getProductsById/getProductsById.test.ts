import { Context} from 'aws-lambda';
import { handler } from './index';

const products = require('../../mocks/products.json');

// jest.mock('../../mocks/products.json', () => ([
//   { "id": "1", title: "Product 1" },
// ]));

describe('getProductsById handler', () => {
  const context = {} as Context;
  const callback = jest.fn();

  it('should return product for provided id', async () => {
    const event = {
      pathParameters: {
        productId: '1',
      },
    } as any;
    const result = await handler(event, context, callback);
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(products[0]),
    });
  });

  it('should return response when product is not found', async () => {
    const productId = '3';
    const event = {
      pathParameters: {
        productId,
      },
    } as any;
    const result = await handler(event, context, callback);
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        message: `Product with id: ${productId} is not found`,
      }),
    });
  });
});