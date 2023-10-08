import axios from 'axios';
import { useEffect, useState } from 'react';
import PedidoList from '../Pedido/PedidoList';
// import io from "socket.io-client"
import { getPedidos } from '../../../../../api/pedidos/getPedidos';
import "./PedidosContainer.css"

function PedidosContainer() {
  // const socket = io.connect('https://sistema-pedidos.onrender.com')
  const [pedidos, setPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPedidos();
        setPedidos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();
  }, []); // Aquí puedes especificar las dependencias si es necesario

  const pedidosFiltrados = pedidos.filter(pedido => {
    const fechaPedido = new Date(pedido.createdAt);

    const esMismoDia = fechaPedido.toISOString().split('T')[0] === fechaSeleccionada.toISOString().split('T')[0];

    const estadoCumple = (filtroEstado === 'todos') || (pedido.estado === filtroEstado);

    return esMismoDia && estadoCumple;
  });

  return (
    <main>
      {/* LISTADO DE PEDIDOS */}
      <div className='my-4 d-flex justify-content-center'>
        <input
          className="form-control input-date"
          type="date"
          value={fechaSeleccionada.toISOString().split('T')[0]}
          onChange={(e) => setFechaSeleccionada(new Date(e.target.value))}
        />
      </div>
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

      <div className="content">
        <div className="container mt-3">
          <div className="table-responsive">
            <table className="table custom-table">
              <thead>
                {
                  pedidosFiltrados.length > 0 && isLoading == false &&
                  <tr className='text-center'>
                    <th scope="col">Título</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Nota</th>
                    <th scope="col">Total</th>
                    <th scope="col">Fecha y hora</th>
                  </tr>
                }
              </thead>
              <tbody>
                {
                  isLoading ?
                  <tr className='text-center'>
                    <td>
                      <div class="spinner-border " role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                    :

                    pedidosFiltrados.map((pedido, index) => (
                      <PedidoList
                        key={index}
                        pedido={pedido}
                      />
                    ))

                }


              </tbody>
            </table>

          </div>
          {
            pedidosFiltrados == 0 && isLoading == false &&
            <div className='text-center'>
              <h5>No se encontraron pedidos...</h5>
            </div>
          }
        </div>
      </div>


    </main>
  )
}

export default PedidosContainer