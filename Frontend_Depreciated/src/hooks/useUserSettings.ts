import { useEffect, useState} from 'react';
import { supabase } from '../supabase';

export function useUserSettings(session) {
    const [settings,setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;

        async function load() {
            const user = session.user;
            const { data, error } = await supabase
                .from('user_settings')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                const { data: inserted } = await supabase
                    .from('user_settings')
                    .insert({
                        user_id: user.id,
                        data: {},
                    })
                    .select()
                    .single();

                setSettings(inserted);
            } else {
                setSettings(data);
            }

            setLoading(false);
        }

        load();
    }, [session]);

    async function updateSettings(newValues) {
        const user=session.user;

        const merged = {
            ...settings.data,
            ...newValues,
        }
        const { data : updated} = await supabase
            .from("user_settings")
            .update({ data: merged })
            .eq('user_id', user.id)
            .select()
            .single();

        setSettings(updated);   
    }
    return { settings, updateSettings, loading}
}