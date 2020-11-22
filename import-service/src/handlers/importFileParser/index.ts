import { S3 } from 'aws-sdk';
import csv from 'csv-parser'; 
import { StatusCodes } from 'http-status-codes';

import readStream from '../../utils/readStream';

export const handler = async (event) => {
  console.log(`importFileParser was triggered with: ${JSON.stringify(event)}`);
  
  try {
    const { BUCKET_NAME, BUCKET_REGION } = process.env;
    const s3 = new S3({ region: BUCKET_REGION });

    for (const record of event.Records) {
      const originalKey = record.s3.object.key;
      const copiedKey = originalKey.replace('uploaded', 'parsed');
      const copySource = `${BUCKET_NAME}/${originalKey}`;
      const params = { Bucket: BUCKET_NAME, Key: originalKey };

      const data = await readStream(s3.getObject(params).createReadStream(), csv);
      console.log(`Data for ${originalKey}: ${data}`);

      console.log(`Copying from: ${copySource}`);

      await s3.copyObject({
        Bucket: BUCKET_NAME,
        CopySource: copySource,
        Key: copiedKey,
      }).promise();

      console.log(`Copied into: ${BUCKET_NAME}/${copiedKey}`);

      console.log(`Removing from original: ${originalKey}`);

      await s3.deleteObject({
        Bucket: BUCKET_NAME,
        Key: originalKey,
      }).promise();

      console.log(`Removed from original: ${originalKey}`);
    }

    return {
      statusCode: StatusCodes.ACCEPTED,
    };
  } catch (error) {
    console.log(`Error execution for import file parser: ${JSON.stringify(error)}`);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
}
