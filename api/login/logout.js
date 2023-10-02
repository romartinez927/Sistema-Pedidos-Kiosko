import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_LOGOUT = import.meta.env.VITE_LOGOUT_URL;

export const logout = async () => {
    try {
        const response = await axios.post(`${VITE_API_URL}/${END_POINT_LOGOUT}`); // Reemplaza con la URL de tu API
        const status = response.status;
        console.log(status)
        return status;
    } catch (error) {
        throw error;
    }
};