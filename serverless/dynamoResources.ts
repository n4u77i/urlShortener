import type { AWS } from '@serverless/typescript';

// Defining the dynamoDB resource
const dynamoResources: AWS['resources']['Resources'] = {
    urlTable: {
        Type: 'AWS::DynamoDB::Table',       // Type of resource
        Properties: {
            // Using serverless CUSTOM variable, the value will be defined in serverles.ts and referenced here
            TableName: '${self:custom.urlTableName}',
            
            // Defining table attributes (fields)
            AttributeDefinitions: [
                {
                    // ID attribute of type string
                    AttributeName: 'id',
                    AttributeType: 'S'
                }
            ],

            // Defining the key for table to lookup
            KeySchema: [
                {
                    // ID attribute will be the key and will hashes in it
                    AttributeName: 'id',
                    KeyType: 'HASH'
                }
            ],

            // Defining the type of billing we want to use
            BillingMode: 'PAY_PER_REQUEST',
        }
    }
}

export default dynamoResources