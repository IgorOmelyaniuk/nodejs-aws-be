import { Context } from 'aws-lambda';
import { handler } from './index';
import { getById } from '../../services/productService';
import getCors from '../../utils/getCors';

jest.mock('../../services/productService', () => ({
  getById: jest.fn(),
}));

const headers = getCors();

describe('getProductsById handler', () => {
  const context = {} as Context;
  const callback = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return product for provided id', async () => {
    const event = {
      pathParameters: {
        productId: '1',
      },
    } as any;
    const product = { id: '1', title: 'Product 1' };
    (getById as jest.Mock).mockResolvedValue(product);
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    });
  });

  it('should return response when product is not found', async () => {
    const productId = '3';
    const event = {
      pathParameters: {
        productId,
      },
    } as any;
    (getById as jest.Mock).mockResolvedValue(null);
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 404,
      headers,
      body: JSON.stringify({
        message: `Product with id: ${productId} is not found`,
      }),
    });
  });

  it('should return response for execution error', async () => {
    const event = {
      pathParameters: {
        productId: '1',
      },
    } as any;
    (getById as jest.Mock).mockRejectedValue({});
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    });
  });
});