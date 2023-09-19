import axios from 'axios';
import { adaptarAdicionalParaWeb } from '../adapters/adiccionalAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_GET_ADICIONALES = import.meta.env.VITE_GET_ADICIONALES_URL;

export const getAdicionales = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/${END_POINT_GET_ADICIONALES}`); // Reemplaza con la URL de tu API
        const adaptedData = response.data.map(adaptarAdicionalParaWeb);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};