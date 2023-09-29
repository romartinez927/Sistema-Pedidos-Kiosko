import axios from 'axios';
import { adaptarAdicionalParaWeb } from '../../adapters/adicionalAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_DELETE_ADICIONAL = import.meta.env.VITE_DELETE_ADICIONAL_URL;

export const deleteAdicional = async (adicionalId) => {
    try {
        const response = await axios.delete(`${VITE_API_URL}/${END_POINT_DELETE_ADICIONAL}/${adicionalId}`); // Reemplaza con la URL de tu API
        const adaptedData = adaptarAdicionalParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};