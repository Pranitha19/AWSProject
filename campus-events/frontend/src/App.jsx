import React, { useEffect, useState } from 'react';
import { getEvents, registerForEvent } from './api';
import { currentSessionJwt, signInHosted } from './auth';

export default function App(){
  const [events,setEvents]=useState([]);
  const [loading,setLoading]=useState(true);
  const [msg,setMsg]=useState('');

  useEffect(()=>{(async()=>{
    try{ const data=await getEvents(); setEvents(data); }catch(e){ setMsg('Could not load events') } finally{ setLoading(false) }
  })()},[]);

  async function handleRegister(id){
    const jwt = await currentSessionJwt();
    if(!jwt){ signInHosted(); return; }
    try{
      const res = await registerForEvent(id,jwt);
      setMsg(res.message || 'Registered');
    }catch(e){ setMsg('Registration failed') }
  }

  if(loading) return <div className="p-6">Loading events…</div>

  return (<div className="p-6 max-w-3xl mx-auto">
    <header className="mb-6">
      <h1 className="text-3xl font-bold">Campus Events</h1>
      <p className="text-sm text-gray-600">Register for workshops, games and volunteering</p>
    </header>

    {msg && <div className="mb-4 p-3 bg-blue-50 border">{msg}</div>}

    <ul className="space-y-4">
      {events.map(ev=>(
        <li key={ev.event_id} className="p-4 border rounded-md flex justify-between items-center">
          <div>
            <div className="font-semibold">{ev.event_name}</div>
            <div className="text-sm text-gray-600">{ev.event_date} · {ev.location}</div>
            <div className="text-xs text-gray-500">Slots left: {ev.available_slots ?? ev.capacity}</div>
          </div>
          <div>
            <button onClick={()=>handleRegister(ev.event_id)} className="px-3 py-1 bg-sky-600 text-white rounded">Register</button>
          </div>
        </li>
      ))}
    </ul>
  </div>)
}