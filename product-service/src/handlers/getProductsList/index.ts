import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import products from '../../mocks/products.json';

export const handler: APIGatewayProxyHandler = async (_: APIGatewayProxyEvent) => {
  console.log(products);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(products),
  };
};
