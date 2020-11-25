import AWSMock from "aws-sdk-mock";
import { SQSEvent } from 'aws-lambda';

import { handler } from './index';
import { create } from '../../services/productService';

const productId = 'd2e52642-f0d0-4d86-9f89-b8284d18eaa9';
const productData = {
  title: 'title',
  description: 'description',
  image: 'http://image.com',
  price: 50,
  count: 2
};
const records = [{ body: JSON.stringify(productData) }];

jest.mock('../../services/productService', () => ({
  create: jest.fn(),
}));

describe('catalogBatchProcess handler', () => {
  const event = { Records: records } as SQSEvent;

  const publishMock = jest.fn((_, callback) => {
    callback();
  });

  afterEach(() => {
    AWSMock.restore('SNS');
    jest.clearAllMocks();
  })

  it('should create products and call publish', async () => {
    AWSMock.mock('SNS', 'publish', publishMock);
    (create as jest.Mock).mockResolvedValue({ ...productData, id: productId });
    
    await handler(event);

    expect(create).toHaveBeenCalledTimes(1);
    expect(publishMock).toHaveBeenCalled();
  });

  it('should not call publish for products', async () => {
    AWSMock.mock('SNS', 'publish', publishMock);
    (create as jest.Mock).mockRejectedValue({});
    
    await handler(event);

    expect(publishMock).not.toHaveBeenCalled();
  });
});