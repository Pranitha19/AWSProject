const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const EVENTS_TABLE = process.env.EVENTS_TABLE;
const REG_TABLE = process.env.REG_TABLE;
module.exports = { ddb, EVENTS_TABLE, REG_TABLE };