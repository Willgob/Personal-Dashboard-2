import { useState, useEffect} from 'react';
import { supabase } from './supabase';
import axios from 'axios';
import './App.css'


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
    supabase.auth.getSession().then(( { data } ))
  });
}


export default App
