import React, { useState } from 'react'
import "./PedidoList.css"
import { setEstadoPedido } from '../../../../../api/pedidos/setEstadoPedido';

function PedidoList( {pedido, socket} ) {

  const [data, setData] = useState({
    nombre: pedido?.product_id?.nombre,
    estado: pedido?.estado,
    cantidad: pedido?.cantidad,
    adicionales: pedido?.adicionales,
    aderezos: pedido?.aderezos
  });
  const [estado, setEstado] = useState(pedido.estado)


  const handleEstado = async(pedido) => {
    const nuevoEstado = await setEstadoPedido(pedido._id)
    setEstado(nuevoEstado.estado)
    if (nuevoEstado) {
      const newEstado = data.estado
      socket.emit("send_message", { message: newEstado})
    }
  }



  return (
    <div className="card-pedidos p-4 m-2 border rounded">
      {/* PEDIDO */}
      <h3>{data.nombre}</h3>
      <p>Cantidad: {data.cantidad}</p>
      <div>
        <h5>Adicionales</h5>
        {
          data.adicionales.map((adicional, index) => (
            <p key={index}>{adicional.nombre}</p>
          ))
        }
      </div>
      <div>
        <h5>Aderezos</h5>
        {
          data.aderezos.map((aderezo, index) => (
            <p key={index}>{aderezo.nombre}</p>
          ))
        }
      </div>
      <button className="btn btn-primary" onClick={() => handleEstado(pedido)}>{estado}</button>
    </div>
  )
}

export default PedidoList