const { ddb, EVENTS_TABLE } = require('./common');
const { v4: uuidv4 } = require('uuid');
exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const id = uuidv4();
  const item = { event_id: id, event_name: body.event_name, event_date: body.event_date, location: body.location, capacity: body.capacity||100, available_slots: body.capacity||100 };
  await ddb.put({ TableName: EVENTS_TABLE, Item: item }).promise();
  return { statusCode: 201, body: JSON.stringify(item) };
};