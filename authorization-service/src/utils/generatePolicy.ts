import { APIGatewayAuthorizerResult } from 'aws-lambda';
import { EffectType } from '../constants';

const generatePolicy = (
  principalId: string,
  resource: string,
  effect = EffectType.Deny
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }
    ],
  }
});

export default generatePolicy;
