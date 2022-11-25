import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb'

// Optionally pass region but by default it sets region where Lambda is deployed
const dynamoClient = new DynamoDBClient({})

export const dynamo = {
    // Variable <data> will be of type Object which takes string as key and anything as value - Record<string, any>
    write: async (data: Record<string, any>, tableName: string) => {
        
        // PutCommandInput will tell the data we need to send in the command
        const params: PutCommandInput = {
            TableName: tableName,
            Item: data
        }

        // PutCommand will create the command
        const command = new PutCommand(params)
        
        await dynamoClient.send(command)

        return data
    }
}