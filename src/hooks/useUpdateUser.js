const { useState } = require("react")

export const useUpdateUser = () => {
  const UPDATE_USER_URL = process.env.REACT_APP_API_ENDPOINT + 'auth/update_user';

  const [loading, setLoading] = useState(false)

  const updateUser = async (params, token) => {
    setLoading(true);

    try {
      const response = await fetch(UPDATE_USER_URL, {
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
      console.log(error)
    }
  }

  return {loading, updateUser}
}