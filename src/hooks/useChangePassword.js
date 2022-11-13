import { useState } from "react";

export const useChangePassword = () => {
    const CHANGE_PASSWORD_URL = process.env.REACT_APP_API_ENDPOINT + 'auth/change_password';

    const [loading, setLoading] = useState(null);

    const changePassword = async (params, token) => {

        setLoading(true);

        try {
            const response = await fetch(CHANGE_PASSWORD_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(params)
            });

            setLoading(false);

            return response;

        } catch (error) {
            console.log(error);
        }
    }
    return { loading, changePassword }
}