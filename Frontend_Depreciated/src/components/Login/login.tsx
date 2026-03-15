import { useState } from "react";
import { supabase } from "../../supabase";
import "./login.css"

export default function Login({ onLogin, onSignup }: { onLogin: () => void; onSignup: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleLogin() {
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            setError(userError?.message ?? "Could not load user");
            return;
        }

        const { error: upsertError } = await supabase
            .from("user_settings")
            .upsert({ user_id: user.id, data: {} }, { onConflict: "user_id", ignoreDuplicates: true });

        if (upsertError) {
            setError(upsertError.message);
            return;
        }
        
        onLogin();
    }

    return (
        <div className="main">
            <input type="email" placeholder = "email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
            <input type="password" placeholder = "password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
            {error && <p className="error">{error}</p>}
            <button onClick={handleLogin}>Login</button>
            <button onClick={onSignup}>Sign Up</button>
        </div>
    )
}