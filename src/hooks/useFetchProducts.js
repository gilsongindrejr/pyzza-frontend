import { useState, useEffect } from 'react';

export const useFetchProducts = (token = null) => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState(null);

    const [cancelled, setCancelled] = useState(null);

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + 'products/'
    console.log(API_ENDPOINT);

    useEffect(() => {
        const loadData = async () => {
            if (cancelled) return;

            setLoading(true);

            try {
                const res = await fetch(API_ENDPOINT, { headers: { 'Authorization': `Token ${token}` } });
                const json = await res.json();

                setProducts(json);
            } catch (error) {
                console.log(error);
                setError(error.message);
            }

            setLoading(false);
        };

        loadData();
    }, [products, cancelled, API_ENDPOINT, token]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { products, loading, error }
}