import { SQSEvent } from 'aws-lambda';
import { SNS } from 'aws-sdk';

import { ProductSchema } from '../../types';
import { ERROR_MESSAGES } from '../../utils/getError';
import { create } from '../../services/productService';

export const handler = async (event: SQSEvent) => {
  console.log('catalogBatchProcess was triggered with', JSON.stringify(event));
  const sns = new SNS({ region: process.env.SNS_REGION });

  try {
    const records = event.Records.map(({ body }) => ({ data: JSON.parse(body) }));
    console.log(`Records: ${JSON.stringify(records)}`);

    const products = [];

    for (let record of records) {
      const { data } = record;

      try {
        await ProductSchema.validate(data);
      } catch (error) {
        console.log(`Error for adding product ${JSON.stringify(error)}`);
        return;
      }

      const product = await create(data);

      if (!product) {
        console.log(`Product was not added to db: ${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}`);
        return;
      }

      products.push(product);
      console.log(`Product was added to db: ${JSON.stringify(product)}`);
    }

    await sns.publish({
      Subject: 'New products were imported',
      Message: JSON.stringify(products),
      TopicArn: process.env.TOPIC_ARN,
      MessageAttributes: {
        productsNumber: {
          DataType: 'Number',
          StringValue: products.length.toString(),
        }
      },
    })
    .promise();

  } catch (error) {
    console.log(`Error execution for creating product: ${JSON.stringify(error)}`);
  }
}
