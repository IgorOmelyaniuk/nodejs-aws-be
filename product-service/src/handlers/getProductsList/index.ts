import { APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { getAll } from '../../services/productService';
import getCors from '../../utils/getCors';
import { ERROR_MESSAGES } from '../../utils/getError';
import sendResponse from '../../utils/sendResponse';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsList was triggered with', JSON.stringify(event));
  const headers = getCors();

  try {
    const products = await getAll();

    if (!products?.length) {
      return sendResponse(
        StatusCodes.NOT_FOUND,
        { message: ERROR_MESSAGES.PRODUCTS_NOT_FOUND },
        headers,
      );
    }

    return sendResponse(
      StatusCodes.OK,
      products,
      headers
    );
  } catch (error) {
    console.log('Error execution for getting all products', JSON.stringify(error));

    return sendResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      { message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      headers,
    );
  }
};
