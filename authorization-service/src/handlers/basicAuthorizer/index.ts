import {
  APIGatewayTokenAuthorizerEvent,
  Context,
  Callback,
  APIGatewayAuthorizerResult
} from 'aws-lambda';

import getEffect from '../../utils/getEffect';
import generatePolicy from '../../utils/generatePolicy';

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent,
  _Context: Context,
  callback: Callback<APIGatewayAuthorizerResult>
) => {
  console.log(`basicAuthorizer was triggered with: ${JSON.stringify(event)}`);

  if (event.type !== 'TOKEN') {
    callback('Unauthorized');
  }

  try {
    const { authorizationToken, methodArn } = event;
    const encodedCredentials = authorizationToken.split(' ')[1];
    const [username, password] = Buffer.from(encodedCredentials, 'base64')
      .toString('utf-8')
      .split(':');

    console.log(`Username: ${username}`);

    const effect = getEffect(username, password);
    const policy = generatePolicy(encodedCredentials, methodArn, effect);

    callback(null, policy);
  } catch (error) {
    console.log(`Error execution for basic authorizer: ${JSON.stringify(error)}`);
    callback(`Unauthorized: ${error.message}`);
  }
} 
