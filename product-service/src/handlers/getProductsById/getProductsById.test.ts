import { Context } from 'aws-lambda';
import { handler } from './index';
import { getById } from '../../services/productService';
import getCors from '../../utils/getCors';
import { ERROR_MESSAGES } from '../../utils/getError';

jest.mock('../../services/productService', () => ({
  getById: jest.fn(),
}));

const headers = getCors();
const productId = 'd2e52642-f0d0-4d86-9f89-b8284d18eaa9';

describe('getProductsById handler', () => {
  const context = {} as Context;
  const callback = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return product for provided id', async () => {
    const event = {
      pathParameters: {
        productId,
      },
    } as any;
    const product = { id: productId, title: 'Product 1' };
    (getById as jest.Mock).mockResolvedValue(product);
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    });
  });

  it('should return response when product is not found', async () => {
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
        message: `${ERROR_MESSAGES.PRODUCT_NOT_FOUND}: ${productId}`,
      }),
    });
  });

  it('should return response when product id is not valid', async () => {
    const event = {
      pathParameters: {
        productId: '1',
      },
    } as any;
    (getById as jest.Mock).mockResolvedValue(null);
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: ERROR_MESSAGES.PRODUCT_ID_NOT_VALID,
      }),
    });
  });

  it('should return response for execution error', async () => {
    const event = {
      pathParameters: {
        productId,
      },
    } as any;
    (getById as jest.Mock).mockRejectedValue({});
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      }),
    });
  });
});