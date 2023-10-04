import axios from 'axios';
import { useEffect, useState } from 'react';
import PedidoList from '../Pedido/PedidoList';
import io from "socket.io-client"
import { getPedidos } from '../../../../../api/pedidos/getPedidos';
import "./PedidosContainer.css"

function PedidosContainer() {
  // const socket = io.connect('https://sistema-pedidos.onrender.com')
  const [pedidos, setPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos'); // 'todos' es el valor inicial

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPedidos()
        setPedidos(data)
        // socket.on("enviar_prueba", async () => {
        //   const dataSocket = await getPedidos()
        //   setPedidos(dataSocket)
        // })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  }, []);
// }, [socket]);


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
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <a className={filtroEstado == 'todos' ? "nav-link active" : "nav-link"} onClick={() => setFiltroEstado('todos')}>Todos</a>
          </li>
          <li className="nav-item">
            <a className={filtroEstado == 'empezar preparacion' ? "nav-link active" : "nav-link"} onClick={() => setFiltroEstado('empezar preparacion')}>Pendientes</a>
          </li>
          <li className="nav-item">
            <a className={filtroEstado == 'preparando' ? "nav-link active" : "nav-link"} onClick={() => setFiltroEstado('preparando')}>En curso</a>
          </li>
          <li className="nav-item">
            <a className={filtroEstado == 'finalizado' ? "nav-link active" : "nav-link"} onClick={() => setFiltroEstado('finalizado')}>Finalizados</a>
          </li>
        </ul>
      </div>
      <div className="container-fluid">
        <div className='d-flex justify-content-center flex-wrap'>
          {
            pedidosFiltrados.map((pedido, index) => (
              <PedidoList
                key={index}
                pedido={pedido}
                // socket={socket}
              />
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default PedidosContainer