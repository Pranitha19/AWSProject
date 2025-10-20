const { ddb, EVENTS_TABLE } = require('./common');
exports.handler = async () => {
  const params = { TableName: EVENTS_TABLE };
  const resp = await ddb.scan(params).promise();
  return { statusCode: 200, headers:{'Content-Type':'application/json'}, body: JSON.stringify(resp.Items) };
};