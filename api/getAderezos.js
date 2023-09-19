import axios from 'axios';
import { adaptarAderezoParaWeb } from '../adapters/aderezoAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_GET_ADEREZOS = import.meta.env.VITE_GET_ADEREZOS_URL;

export const getAderezos = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/${END_POINT_GET_ADEREZOS}`); // Reemplaza con la URL de tu API
        const adaptedData = response.data.map(adaptarAderezoParaWeb);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};