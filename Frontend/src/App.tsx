import { useState, useEffect} from 'react';
import { supabase } from './supabase';
import axios from 'axios';
import './App.css'
import { useUserSettings } from './hooks/useUserSettings';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [session, setSession] = useState(null);

  async function signIn() {
    const {error} = await supabase.auth.signInWithOtp({ email });
    if (error) setMessage("Error:" + error.message);
    else setMessage("Link sent! Check your email.");

  }

  useEffect(() => {
    supabase.auth.getSession().then(( { data } ) => {
      setSession(data.session);
    });

    const { data: listener} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);
  
  const { settings, updateSettings, loading } = useUserSettings(session);

  if (!session) {
    return (
      <>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={signIn}>Send Email</button>
        <p>{message}</p>
      </>
    )
  }

  if (settings?.data?.isAdmin) {
    return (
      <div>
        <h1>Hi admin  </h1>
        <h1> User: {session.user.email}</h1>
        <pre>{JSON.stringify(settings, null,2)}</pre>
        <button onClick={() => updateSettings({ test: false})}>Button</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Hi {session.user.email}</h1>
    </div>
  )
  }



export default App
