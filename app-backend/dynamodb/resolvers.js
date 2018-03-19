// add to handler.js
import dynamodb from 'serverless-dynamodb-client';

const docClient = dynamodb.doc; // return an instance of new AWS.DynamoDB.DocumentClient()

// add to handler.js
const promisify = foo =>
new Promise((resolve, reject) => {
    foo((error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result);
        }
    });
});

const connectionEndpoint = {
    // getRawConnection(id) {
    //     return promisify(callback =>
    //         docClient.query(
    //             {
    //                 TableName: 'connections',
    //                 KeyConditionExpression: 'id = :id',
    //                 ExpressionAttributeValues: {
    //                     ':id': id,
    //                 },
    //             },
    //             callback
    //         )
    //     ).then(result => result);
    // },
    getRawConnections() {
        return promisify(callback => 
            docClient.scan({
                TableName: 'connections',
                Select: 'ALL_ATTRIBUTES', 
            }, callback)
        ).then(result => {
            console.log(result);
            return result.Items;
        });
    },
    
};

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
    Query: {
        getConnections: (root, args) => connectionEndpoint.getRawConnections(args),
    },
};
