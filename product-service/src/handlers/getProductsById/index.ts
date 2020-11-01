import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import products from '../../mocks/products.json';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const { productId } = event.pathParameters;
  const product = products.find(item => item.id === productId);

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Product with id: ${productId} is not found`,
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
