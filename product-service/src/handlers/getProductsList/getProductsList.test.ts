import { Context} from 'aws-lambda';
import { handler } from './index';

jest.mock('../../mocks/products.json', () => ([
  { "id": "1", title: "Product 1" },
]));

describe('getProductsList handler', () => {
  const context = {} as Context;
  const callback = jest.fn();
  const event = {} as any;

  it('should return list of products', async () => {
    const result = await handler(event, context, callback);
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify([{ "id": "1", title: "Product 1" }]),
    });
  });
});