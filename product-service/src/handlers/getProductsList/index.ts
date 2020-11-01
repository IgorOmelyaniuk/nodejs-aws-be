import { APIGatewayProxyHandler } from 'aws-lambda';

import { getAll } from '../../services/productService';
import getCors from '../../utils/getCors';

export const handler: APIGatewayProxyHandler = async () => {
  const headers = getCors();

  try {
    const products = await getAll();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log('Error execution for getting all products', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    }
  }
};
