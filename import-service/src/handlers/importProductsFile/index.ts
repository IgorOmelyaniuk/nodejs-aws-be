import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { StatusCodes } from 'http-status-codes';

import getCors from '../../utils/getCors';
import { ERROR_MESSAGES }  from '../../utils/getError';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log(`importProductsFile was triggered with: ${JSON.stringify(event)}`);
  const headers = getCors();

  try {
    const { name } = event?.queryStringParameters;
    
    if (!name) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        headers,
        body: JSON.stringify({ message: ERROR_MESSAGES.FILE_NAME_IS_NOT_FOUND }),
      };
    }

    const { BUCKET_NAME, BUCKET_REGION } = process.env;
    const catalogName = `uploaded/${name}`;
    const s3 = new S3({ region: BUCKET_REGION });
    const params = {
      Bucket: BUCKET_NAME,
      Key: catalogName,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const signedUrl = await new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (error, url) => {
        if (error) {
          return reject(error);
        }

        return resolve(url)
      })
    })

    console.log(`Signed url: ${signedUrl}`);

    return {
      statusCode: StatusCodes.OK,
      headers,
      body: JSON.stringify({ url: signedUrl }),
    }
  } catch (error) {
    console.log(`Error execution for getting signed url: ${JSON.stringify(error)}`);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      headers,
      body: JSON.stringify({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }),
    }
  }
}
