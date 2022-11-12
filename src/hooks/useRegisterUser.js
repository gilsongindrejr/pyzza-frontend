import { useState } from "react";

export const useRegisterUser = () => {
    const REGISTER_URL = process.env.REACT_APP_API_ENDPOINT + 'auth/register';

    const [loading, setLoading] = useState(null);

    const registerUser = async (params) => {

        setLoading(true);

        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            setLoading(false);

            return await response.json();

        } catch (error) {
            console.log(error);
        }
    }
    return { loading, registerUser }
}