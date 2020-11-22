import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
  },
  frameworkVersion: '2',
  custom: {
    multipleSnsEmail: 'igoromelyaniuk@gmail.com',
    snsEmail: 'iamelyaniuk@gmail.com',
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: {
          'Fn::GetAtt': ['SQSQueue', 'Arn']
        },
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          Ref: 'SNSTopic'
        },
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_DATABASE: process.env.DB_DATABASE,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      TOPIC_ARN: {
        Ref: 'SNSTopic',
      },
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue'
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic',
        }
      },
      MultipleSNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: '${self:custom.multipleSnsEmail}',
          Protocol: 'email',
          FilterPolicy: { productsNumber: [{"numeric": [">=", 2]}] },
          TopicArn: {
            Ref: 'SNSTopic'
          },
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: '${self:custom.snsEmail}',
          Protocol: 'email',
          FilterPolicy: { productsNumber: [{"numeric": ["=", 1]}] },
          TopicArn: {
            Ref: 'SNSTopic'
          },
        },
      },
    },
    Outputs: {
      SQSQueueUrl: {
        Value: {
          Ref: 'SQSQueue',
        }
      },
      SQSQueueArn: {
        Value: {
          'Fn::GetAtt': ['SQSQueue', 'Arn']
        }
      }
    }
  },
  functions: {
    getProductsList: {
      handler: 'src/handlers/getProductsList/index.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    getProductsById: {
      handler: 'src/handlers/getProductsById/index.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{productId}',
            cors: true
          }
        }
      ]
    },
    createProduct: {
      handler: 'src/handlers/createProduct/index.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    catalogBatchProcess: {
      handler: 'src/handlers/catalogBatchProcess/index.handler',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              'Fn::GetAtt': [
                'SQSQueue',
                'Arn',
              ]
            }
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
