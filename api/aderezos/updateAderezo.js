import axios from 'axios';
import { adaptarAderezoParaWeb } from '../../adapters/aderezoAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_UPDATE_ADEREZO = import.meta.env.VITE_UPDATE_ADEREZO_URL;

export const updateAderezo = async (aderezoId, aderezo) => {
    try {
        const response = await axios.put(`${VITE_API_URL}/${END_POINT_UPDATE_ADEREZO}/${aderezoId}`, aderezo); // Reemplaza con la URL de tu API
        const adaptedData = adaptarAderezoParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
}; 