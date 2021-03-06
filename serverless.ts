import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: 'serverless-ses-forwarder',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: [
    'serverless-webpack',
    'serverless-dotenv-plugin'
  ],
  provider: {
    name: 'aws',
    region: 'us-west-2',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    logRetentionInDays: 30,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          's3:GetObject',
          's3:PutObject'
        ],
        Resource: 'arn:aws:s3:::ses-oknmjp-receive-mail/*'
      },
      {
        Effect: 'Allow',
        Action: [
          'ses:SendRawEmail'
        ],
        Resource: '*'
      }
    ]
  },
  functions: {
    'forward-ses': {
      handler: 'src/handlers/forwardSes.handler',
      environment: {
        EMAIL_BUCKET: '${env:EMAIL_BUCKET}',
        ORIGINAL_RECIPIENT: '${env:ORIGINAL_RECIPIENT}',
        FORWARD_RECIPIENT: '${env:FORWARD_RECIPIENT}'
      }
    }
  }
}

module.exports = serverlessConfiguration;
