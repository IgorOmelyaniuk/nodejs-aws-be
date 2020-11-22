import AWSMock from "aws-sdk-mock";
import { Context } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { handler } from './index';
import getCors from '../../utils/getCors';
import { ERROR_MESSAGES } from '../../utils/getError';

const headers = getCors();

describe('importProductsFile handler', () => {
  const context = {} as Context;
  const callback = jest.fn();

  afterEach(() => {
    AWSMock.restore('S3');
  })

  it('should return response when file name is not provided', async () => {
    const event = {
      queryStringParameters: {},
    } as any;

    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: StatusCodes.BAD_REQUEST,
      headers,
      body: JSON.stringify({ message: ERROR_MESSAGES.FILE_NAME_IS_NOT_FOUND }),
    });
  });

  it('should return correct response with url', async () => {
    const event = {
      queryStringParameters: {
        name: 'product.csv'
      },
    } as any;
    const mockSignedUrl = 'https://aws:s3:product.csv';

    AWSMock.mock('S3', 'getSignedUrl', (_action, _params, callback) => {
      callback(null, mockSignedUrl);
    });
    
    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: StatusCodes.OK,
      headers,
      body: JSON.stringify({ url: mockSignedUrl }),
    });
  });

  it('should return correct response for error execution', async () => {
    const event = {
      queryStringParameters: {
        name: 'product.csv'
      },
    } as any;
    
    AWSMock.mock('S3', 'getSignedUrl', (_action, _params, callback) => {
      callback({ error: 'error' }, null);
    });

    const result = await handler(event, context, callback);

    expect(result).toEqual({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      headers,
      body: JSON.stringify({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }),
    });
  });
});