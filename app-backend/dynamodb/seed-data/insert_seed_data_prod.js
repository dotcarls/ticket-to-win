// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing cities and connections into DynamoDB. Please wait.');

const allConnections = JSON.parse(fs.readFileSync('connections.json', 'utf8'));

allConnections.forEach(connection => {
    const params = {
        TableName: 'connections',
        Connection: connection
    };
    
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(
                'Unable to add connection',
                connection,
                '. Error JSON:',
                JSON.stringify(err, null, 2)
            );
        } else {
            console.log('PutItem connection succeeded:', data);
        }
    });
});