import axios from 'axios';
import { adaptarAderezoParaWeb } from '../../adapters/aderezoAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_DELETE_ADEREZO = import.meta.env.VITE_DELETE_ADEREZO_URL;

export const deleteAderezo = async (aderezoId) => {
    try {
        const response = await axios.delete(`${VITE_API_URL}/${END_POINT_DELETE_ADEREZO}/${aderezoId}`); // Reemplaza con la URL de tu API
        const adaptedData = adaptarAderezoParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};