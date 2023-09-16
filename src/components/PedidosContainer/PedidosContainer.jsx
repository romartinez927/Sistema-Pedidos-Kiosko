import axios from 'axios';
import { useEffect, useState } from 'react';
import PedidoList from '../Pedido/PedidoList';
import io from "socket.io-client"
const socket = io.connect("https://sistema-pedidos.onrender.com")

function PedidosContainer() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/api/pedidos`).then((response) => {
        setPedidos(response.data);
        console.log(response.data);
        socket.on("enviar_prueba", (data) => {
            alert(data)
        })
      });
    }, [socket]);

    
  return (
    <main className='py-5 px-4'>
        <h1 className='text-center'>Listado de Pedidos</h1>
        <div className='d-flex justify-content-center flex-wrap'>
        {
            pedidos.map((pedido, index) => (
            <PedidoList key={index} pedido={pedido} socket={socket}/>
            ))
        }
        </div>
    </main>
  )
}

export default PedidosContainer