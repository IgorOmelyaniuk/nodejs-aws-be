import { Context } from 'aws-lambda';
import { handler } from './index';
import { create } from '../../services/productService';
import getCors from '../../utils/getCors';
import { ERROR_MESSAGES } from '../../utils/getError';

jest.mock('../../services/productService', () => ({
  create: jest.fn(),
}));

const headers = getCors();
const productId = 'd2e52642-f0d0-4d86-9f89-b8284d18eaa9';
const invalidProductData = {
  description: 'description',
  image: 'http://image.com',
  price: 50,
  count: 2
}
const productData = {
  ...invalidProductData,
  title: 'title',
};

describe('createProduct handler', () => {
  const context = {} as Context;
  const callback = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should create and return new product', async () => {
    const event = {
      body: JSON.stringify(productData),
    } as any;
    
    (create as jest.Mock).mockResolvedValue({ ...productData, id: productId });
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 201,
      headers,
      body: JSON.stringify({ ...productData, id: productId }),
    });
  });

  it('should return response when product data is not valid', async () => {
    const event = {
      body: JSON.stringify(invalidProductData),
    } as any;
    (create as jest.Mock).mockResolvedValue(null);
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: ERROR_MESSAGES.PRODUCT_NOT_VALID,
      }),
    });
  });

  it('should return response for execution error', async () => {
    const event = {
      body: JSON.stringify(productData),
    } as any;
    (create as jest.Mock).mockRejectedValue({});
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