export const API_BASE = import.meta.env.VITE_API_BASE || 'https://YOUR_API.execute-api.REGION.amazonaws.com/prod';

export async function getEvents(){
  const res = await fetch(`${API_BASE}/events`);
  if(!res.ok) throw new Error('Failed');
  return res.json();
}

export async function createEvent(event, jwt){
  const res = await fetch(`${API_BASE}/events`, {
    method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${jwt}` }, body: JSON.stringify(event)
  });
  return res.json();
}

export async function registerForEvent(eventId, jwt){
  const res = await fetch(`${API_BASE}/events/${eventId}/register`, {
    method:'POST', headers: jwt ? { Authorization:`Bearer ${jwt}` } : {}
  });
  return res.json();
}