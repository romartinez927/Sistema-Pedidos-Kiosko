import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_SET_PEDIDOS_ESTADO = import.meta.env.VITE_SET_PEDIDOS_ESTADO_URL;

export const setEstadoPedido = async (idPedido) => {
    try {
        const url = `${VITE_API_URL}/${END_POINT_SET_PEDIDOS_ESTADO}/${idPedido}/comenzar`
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.request(config)
        return response.data
    } catch (error) {
        throw error;
    }
};