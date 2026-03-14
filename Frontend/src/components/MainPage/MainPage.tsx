import { useState, useEffect} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../supabase';
import './MainPage.css'

type UserSettings = {
    user_id: string;
    data: Record<string, unknown>;
};

export default function MainPage() {
    const [user,setUser] = useState<User | null>(null);
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        async function loaddata() {
            const { data: {user}, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                setError(userError?.message ?? 'User not found');
                setLoading(false);
                return;
            }

            setUser(user);

            const { data: settings, error: settingsError } = await supabase
                .from('user_settings')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            if (settingsError) {
                setError(settingsError.message);
                setLoading(false);
                return;
            }

            if (!settings) {
                const { data: inserted, error: insertError } = await supabase
                    .from('user_settings')
                    .insert({ user_id: user.id, data: {} })
                    .select('*')
                    .single();

                if (insertError) {
                    setError(insertError.message);
                    setLoading(false);
                    return;
                }

                setSettings(inserted);
                setLoading(false);
                return;
            }

            setSettings(settings);
            setLoading(false);
        }

        loaddata();
    }, []);

    async function addSettings( json_title ,json) {
        const mergeddata = {
            ...settings.data,
            [json_title]: json,
        };

        await supabase
            .from("user_settings")
            .update({ data: mergeddata })
            .eq('user_id', user.id);
        setSettings({ ...settings, data: mergeddata });
        setInput("");

    }

    // Loading stuff
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error - {error}</div>;
    }

    if (!user || !settings) {
        return <div>Couldn;t load dashboard data.</div>;
    }
    
    // The acuall content
    return (
        <div>
            <h1>Dashboard</h1>
            <p> Email {user.email}</p>
            <p>USERID: {settings.user_id}</p>
            <p> Data: {JSON.stringify(settings.data.test)}</p>
            <button onClick={() => addSettings("test", "2")}>2</button>
            <button onClick={() => addSettings("test", "1")}>1</button>
        </div>
    );
}
