const { ddb, EVENTS_TABLE, REG_TABLE } = require('./common');
const { v4: uuidv4 } = require('uuid');
exports.handler = async (event) => {
  const eventId = event.pathParameters.eventId;
  const userId = event.requestContext.authorizer?.jwt?.claims?.sub || 'anon-user';
  const getParams = { TableName: EVENTS_TABLE, Key: { event_id: eventId } };
  const ev = (await ddb.get(getParams).promise()).Item;
  if(!ev) return { statusCode:404, body: JSON.stringify({ message: 'Event not found' }) };
  if(ev.available_slots <= 0) return { statusCode:400, body: JSON.stringify({ message: 'No slots available' }) };
  const regId = uuidv4();
  const regItem = { registration_id: regId, user_id: userId, event_id: eventId, registration_date: new Date().toISOString() };
  const params = { TransactItems: [
    { Put: { TableName: REG_TABLE, Item: regItem } },
    { Update: { TableName: EVENTS_TABLE, Key: { event_id: eventId }, UpdateExpression: 'SET available_slots = available_slots - :one', ConditionExpression: 'available_slots >= :one', ExpressionAttributeValues: { ':one': 1 } } }
  ]};
  try{ await ddb.transactWrite(params).promise(); return { statusCode:200, body: JSON.stringify({ message: 'Registered', registration_id: regId }) }; }
  catch(err){ return { statusCode:500, body: JSON.stringify({ message: 'Registration failed', error: err.message }) }; }
};