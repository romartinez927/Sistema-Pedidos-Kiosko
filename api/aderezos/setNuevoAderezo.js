import axios from 'axios';
import { adaptarAderezoParaWeb } from '../../adapters/aderezoAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_SET_ADEREZO = import.meta.env.VITE_SET_ADEREZO_URL;

export const setNuevoAderezo = async (aderezo) => {
    try {
        const response = await axios.post(`${VITE_API_URL}/${END_POINT_SET_ADEREZO}`, aderezo); // Reemplaza con la URL de tu API
        const adaptedData = adaptarAderezoParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};