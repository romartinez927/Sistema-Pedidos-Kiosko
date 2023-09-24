import axios from 'axios';
import { useEffect, useState } from 'react';
import PedidoList from '../Pedido/PedidoList';
import io from "socket.io-client"
import { getPedidos } from '../../../../../api/pedidos/getPedidos';
const socket = io.connect(`${import.meta.env.VITE_API_SOCKET}`)

function PedidosContainer() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getPedidos()
          setPedidos(data)
          socket.on("enviar_prueba", async(data) => {
            const dataSocket = await getPedidos()
            setPedidos(dataSocket)
          })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
      fetchData()
  }, [socket]);


  return (
    <main>
        {/* LISTADO DE PEDIDOS */}
        <h1 className='text-center'>Listado de Pedidos</h1>
        <div className='d-flex justify-content-center flex-wrap'>
        {
            pedidos.map((pedido, index) => (
            <PedidoList 
              key={index} 
              pedido={pedido} 
              socket={socket}
            />
            ))
        }
        </div>
    </main>
  )
}

export default PedidosContainer