import { adaptarProductoParaWeb } from '../adapters/productoAdapter';


const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_GET_PRODUCTOS = import.meta.env.VITE_GET_PRODUCTOS_URL;

export const getProductos = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/${END_POINT_GET_PRODUCTOS}`); // Reemplaza con la URL de tu API
        const adaptedData = response.map(adaptarProductoParaWeb);
        return adaptedData;
    } catch (error) {
        throw error;
    }
};