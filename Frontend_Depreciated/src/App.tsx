import { useState, useEffect} from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import './App.css'
import Login from './components/Login/login';
import MainPage from './components/MainPage/MainPage';
import Signup from './components/Signup/signup';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!session) {
    if (showSignup) {
      return <Signup onBackToLogin={() => setShowSignup(false)} />;
    }

    return (
      <Login
        onLogin={() => {}}
        onSignup={() => setShowSignup(true)}
      />
    );
  }

  return <MainPage />;
}
