import { APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { ProductSchema } from '../../types';
import getCors from '../../utils/getCors';
import sendResponse from '../../utils/sendResponse';
import { ERROR_MESSAGES } from '../../utils/getError';
import { create } from '../../services/productService';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('createProduct was triggered with', JSON.stringify(event));
  const headers = getCors();

  try {
    const productData = event?.body && JSON.parse(event.body);

    try {
      await ProductSchema.validate(productData);
    } catch (error) {
      return sendResponse(
        StatusCodes.BAD_REQUEST,
        { message: ERROR_MESSAGES.PRODUCT_NOT_VALID },
        headers,
      );
    }

    const product = await create(productData);

    if (!product) {
      return sendResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        { message: ERROR_MESSAGES.PRODUCT_NOT_CREATED },
        headers,
      );
    }

    return sendResponse(
      StatusCodes.CREATED,
      product,
      headers,
    );
  } catch (error) {
    console.log('Error execution for creating product ', JSON.stringify(error));

    return sendResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      { message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      headers,
    );
  }
}

