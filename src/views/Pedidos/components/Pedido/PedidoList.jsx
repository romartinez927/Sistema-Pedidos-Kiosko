import React, { useState } from 'react'
import "./PedidoList.css"
import { setEstadoPedido } from '../../../../../api/pedidos/setEstadoPedido';

function PedidoList( {pedido, socket} ) {
  const { titulo, cantidad, adicionales, aderezos, nota } = pedido;
  const [estado, setEstado] = useState(pedido.estado)

  const handleEstado = async(pedido) => {
    const nuevoEstado = await setEstadoPedido(pedido._id)
    setEstado(nuevoEstado.estado)
    if (nuevoEstado) {
      const newEstado = estado
      socket.emit("send_message", { message: newEstado})
    }
  }

  return (
    <div className="card-pedidos p-4 m-2 border rounded">
      {/* PEDIDO */}
      <h3>{titulo}</h3>
      <p>Cantidad: {cantidad}</p>
      <div>
        <h5>Adicionales</h5>
        {
          adicionales.map((adicional, index) => (
            <p key={index}>{adicional.nombre}</p>
          ))
        }
      </div>
      <div>
        <h5>Aderezos</h5>
        {
          aderezos.map((aderezo, index) => (
            <p key={index}>{aderezo.nombre}</p>
          ))
        }
      </div>
      {
        nota !== "" ? (
          <div>
            <h5>Nota</h5>
            <p>{nota}</p>
          </div>
        ) :
        <></>
      }
      <button className="btn btn-primary" onClick={() => handleEstado(pedido)}>{estado}</button>
    </div>
  )
}

export default PedidoList