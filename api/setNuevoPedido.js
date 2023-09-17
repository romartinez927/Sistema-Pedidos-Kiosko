import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL
const END_POINT_SET_PEDIDO = import.meta.env.VITE_SET_PEDIDO_URL;

export const setNuevoPedido = async (pedido) => {
    try {

        const url = `${VITE_API_URL}/${END_POINT_SET_PEDIDO}`
    
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: pedido
        };

        const response = await axios.request(config)
        console.log(response)
        return response
    } catch (error) {
        throw error;
    }
};