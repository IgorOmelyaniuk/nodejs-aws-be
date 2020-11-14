import { StatusCodes } from 'http-status-codes';

export default (statusCode: StatusCodes, body, headers) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});