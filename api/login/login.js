import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_LOGIN = import.meta.env.VITE_LOGIN_URL;

export const login = async (user) => {
    try {
        const response = await axios.post(`${VITE_API_URL}/${END_POINT_LOGIN}`, user); // Reemplaza con la URL de tu API
        const status = response.status;
        return response;
    } catch (error) {
        alert("Usuario o contraseña incorrecta")
        throw error;
    }
};