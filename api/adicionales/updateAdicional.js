import axios from 'axios';
import { adaptarAdicionalParaWeb } from '../../adapters/adicionalAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_UPDATE_ADICIONAL = import.meta.env.VITE_UPDATE_ADICIONAL_URL;

export const updateAdicional = async (adicionalId, adicional) => {
    try {
        const response = await axios.put(`${VITE_API_URL}/${END_POINT_UPDATE_ADICIONAL}/${adicionalId}`, adicional); // Reemplaza con la URL de tu API
        const adaptedData = adaptarAdicionalParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
}; 