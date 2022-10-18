import { useState, useEffect } from 'react';

export const useFetchCategories = (token = null) => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);

    const [cancelled, setCancelled] = useState(null);

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + 'categories/';
    console.log(API_ENDPOINT);

    useEffect(() => {
        const loadData = async () => {
            if (cancelled) return;

            setLoading(true);

            try {
                const res = await fetch(API_ENDPOINT, { headers: { 'Authorization': `Token ${token}` } });
                const json = await res.json();

                setCategories(json);
            } catch (error) {
                console.log(error);
                setError(error.message);
            }

            setLoading(false);
        };

        loadData();
    }, [token, API_ENDPOINT, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { categories, loading, error };
}