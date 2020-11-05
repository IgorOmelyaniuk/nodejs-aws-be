import { Context } from 'aws-lambda';
import { handler } from './index';
import { getAll } from '../../services/productService';
import getCors from '../../utils/getCors';

jest.mock('../../services/productService', () => ({
  getAll: jest.fn(),
}));

const headers = getCors();

describe('getProductsList handler', () => {
  const context = {} as Context;
  const callback = jest.fn();
  const event = {} as any;

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return response with product list', async () => {
    const products = [{ id: '1', title: 'Product 1' }];
    (getAll as jest.Mock).mockResolvedValue(products);
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 200,
      headers,
      body: JSON.stringify(products),
    });
  });

  it('should return response for execution error', async () => {
    (getAll as jest.Mock).mockRejectedValue({});
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