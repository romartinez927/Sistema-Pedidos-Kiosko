import axios from 'axios';
import { useEffect, useState } from 'react';
import PedidoList from '../Pedido/PedidoList';
import io from "socket.io-client"
import { getPedidos } from '../../../../../api/pedidos/getPedidos';
const socket = io.connect(`${import.meta.env.VITE_API_SOCKET}`)

function PedidosContainer() {
    const [pedidos, setPedidos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('todos'); // 'todos' es el valor inicial

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

  const pedidosFiltrados = pedidos.filter(pedido => {
    if (filtroEstado === 'todos') {
      return true;
    } else {
      return pedido.estado === filtroEstado;
    }
  });
  return (
    <main>
        {/* LISTADO DE PEDIDOS */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button onClick={() => setFiltroEstado('todos')}>Todos</button>
          <button onClick={() => setFiltroEstado('empezar preparacion')}>Pendientes</button>
          <button onClick={() => setFiltroEstado('preparando')}>En curso</button>
          <button onClick={() => setFiltroEstado('finalizado')}>Finalizados</button>
        </div>
        <div className="container-fluid">
          <div className='d-flex justify-content-center flex-wrap'>
          {
              pedidosFiltrados.map((pedido, index) => (
              <PedidoList 
                key={index} 
                pedido={pedido} 
                socket={socket}
              />
              ))
          }
          </div>
        </div>
    </main>
  )
}

export default PedidosContainer