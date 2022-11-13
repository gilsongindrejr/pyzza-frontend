import { useState } from "react"

export const useLogoutUser = () => {

    const LOGOUT_URL = process.env.REACT_APP_API_ENDPOINT + 'auth/logout';

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)

    const logoutUser = async (token) => {
        setLoading(true);

        try {
            const response = await fetch(LOGOUT_URL, {
                method: 'POST',
                headers: {'Authorization': `Token ${token}`}
            })

            setStatus(response.status)
        } catch (error) {
            console.log(error)
        }

        setLoading(false);
    }

    return { status, loading, logoutUser }
}