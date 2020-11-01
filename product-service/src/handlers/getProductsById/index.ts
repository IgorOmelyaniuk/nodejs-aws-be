import { APIGatewayProxyHandler } from 'aws-lambda';

import getCors from '../../utils/getCors';
import { getById } from '../../services/productService';

export const handler: APIGatewayProxyHandler = async (event) => {
  const headers = getCors();

  try {
    const { productId } = event.pathParameters;
    const product = await getById(productId);

    if (!product) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: `Product with id: ${productId} is not found`,
        }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    };
  } catch (error) {
    console.log('Error execution for getting product by id', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    }
  }
}

