import axios from 'axios';
import { adaptarProductoParaWeb } from '../adapters/productoAdapter';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_UPDATE_PRODUCTO = import.meta.env.VITE_UPDATE_PRODUCTO_URL;

export const updateProducto = async (productoId, producto) => {
    try {
        const response = await axios.put(`${VITE_API_URL}/${END_POINT_UPDATE_PRODUCTO}/${productoId}`, producto); // Reemplaza con la URL de tu API
        const adaptedData = adaptarProductoParaWeb(response.data);
        return adaptedData;
    } catch (error) {
        throw error;
    }
}; 