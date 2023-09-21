import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_GET_PEDIDOS = import.meta.env.VITE_GET_PEDIDOS_URL;

export const getPedidos = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/${END_POINT_GET_PEDIDOS}`); // Reemplaza con la URL de tu API
        return response.data;
    } catch (error) {
        throw error;
    }
};