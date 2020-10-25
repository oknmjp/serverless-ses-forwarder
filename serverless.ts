import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-ses-forwarder',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
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
    forwardSes: {
      handler: 'src/handlers/forwardSes.handler'
    }
  }
}

module.exports = serverlessConfiguration;
