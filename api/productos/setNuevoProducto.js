import axios from 'axios';
import { adaptarProductoParaWeb } from '../../adapters/productoAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_SET_PRODUCTO = import.meta.env.VITE_SET_PRODUCTO_URL;

export const setNuevoProducto = async (producto) => {
    try {
        const response = await axios.post(`${VITE_API_URL}/${END_POINT_SET_PRODUCTO}`, producto); // Reemplaza con la URL de tu API
        const adaptedData = adaptarProductoParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};