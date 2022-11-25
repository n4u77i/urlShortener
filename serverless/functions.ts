import type { AWS } from '@serverless/typescript';

const functions: AWS["functions"] = {
    // Any function name
    combinationAPI: {
        // Lambda function path
        handler: 'src/functions/setUrl/index.handler',

        // Event to trigger lambda function
        events: [
            {
                httpApi: {
                    path: '/',
                    method: 'post'
                }
            }
        ]
    }
}

export default functions