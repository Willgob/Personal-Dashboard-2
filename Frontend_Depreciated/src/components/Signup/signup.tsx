import { useState } from "react";
import { supabase } from "../../supabase";
import "./signup.css"

export default function Signup({ onBackToLogin }: { onBackToLogin: () => void}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function handleSignup() {
        setError("");
        setMessage("");

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        setMessage("Signup successful! Please check your email to confirm your account.");
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={onBackToLogin}>Back to Login</button>
        </div>
    );
}