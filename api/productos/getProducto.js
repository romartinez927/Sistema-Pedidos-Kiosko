import axios from 'axios';
import { adaptarProductoParaWeb } from '../../adapters/productoAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_GET_PRODUCTO = import.meta.env.VITE_GET_PRODUCTO_URL;

export const getProducto = async (productoId) => {
    try {
        const response = await axios.get(`${VITE_API_URL}/${END_POINT_GET_PRODUCTO}/${productoId}`); // Reemplaza con la URL de tu API
        const adaptedData = adaptarProductoParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};