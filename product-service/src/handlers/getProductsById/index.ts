import { APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';

import getCors from '../../utils/getCors';
import sendResponse from '../../utils/sendResponse';
import { ERROR_MESSAGES } from '../../utils/getError';
import { getById } from '../../services/productService';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsById was triggered with ', JSON.stringify(event));
  const headers = getCors();

  try {
    const { productId } = event.pathParameters;

    if (!validator.isUUID(productId)) {
      return sendResponse(
        StatusCodes.BAD_REQUEST,
        { message: ERROR_MESSAGES.PRODUCT_ID_NOT_VALID },
        headers,
      );
    }

    const product = await getById(productId);

    if (!product) {
      return sendResponse(
        StatusCodes.NOT_FOUND,
        { message: `${ERROR_MESSAGES.PRODUCT_NOT_FOUND}: ${productId}` },
        headers,
      );
    }

    return sendResponse(
      StatusCodes.OK,
      product,
      headers
    );
  } catch (error) {
    console.log('Error execution for getting product by id', JSON.stringify(error));

    return sendResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      { message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      headers,
    );
  }
}

