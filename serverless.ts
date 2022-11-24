import type { AWS } from '@serverless/typescript';

import functions from './serverless/functions'
import dynamoResources from './serverless/dynamoResources'

const serverlessConfiguration: AWS = {
  service: 'urlshortener',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'nautti_serverless_dell_user',   // AWS user in credentials file, if left default is used
    region: 'us-east-1',  // Default region (if not mentioned explicitly)
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      urlTableName: '${self:custom.urlTableName}'     // Defining name of table in env variable
    },
  },
  // import the function via paths
  functions,
  // Add custom resources
  resources: {
    ...dynamoResources
  },
  package: { individually: true },
  custom: {
    // Defining our custom variable for table name, <sls-stage> variable will allow us to define type of env like dev or prod
    urlTableName: '${sls-stage}-url-table',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
