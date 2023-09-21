import axios from 'axios';
import { adaptarAdicionalParaWeb } from '../../adapters/adicionalAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_SET_ADICIONAL = import.meta.env.VITE_SET_ADICIONAL_URL;

export const setNuevoAdicional = async (adicional) => {
    try {
        const response = await axios.post(`${VITE_API_URL}/${END_POINT_SET_ADICIONAL}`, adicional); // Reemplaza con la URL de tu API
        const adaptedData = adaptarAdicionalParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};