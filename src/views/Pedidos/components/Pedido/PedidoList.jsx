import React, { useState } from 'react'
import "./PedidoList.css"

function PedidoList( {pedido, socket} ) {

  const [data, setData] = useState({
    nombre: pedido?.product_id?.[0]?.product[0]?.nombre,
    estado: pedido?.estado,
    cantidad: pedido?.cantidad,
    adicionales: pedido?.adicionales[0]?.nombre,
    aderezos: pedido?.aderezos[0]?.nombre
  });
  const [estado, setEstado] = useState(pedido.estado)

  const handleEstado = async(pedido) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/pedidos/${pedido._id}/comenzar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      setEstado(data.estado)
      const newEstado = data.estado
      socket.emit("send_message", { message: newEstado})
    })
    .catch(error => {
      console.error('Error en la solicitud PUT:', error)
    })
  }


  return (
    <div className="card-pedidos p-4 m-2 border rounded">
      {/* PEDIDO */}
      <h3>{data.nombre}</h3>
      <div>
        <h5>Adicionales</h5>
        <p>Huevo</p>
        <p>Papas Pay</p>
      </div>
      <div>
        <h5>Aderezos</h5>
        <p>Mayonesa</p>
      </div>
      <button className="btn btn-primary" onClick={() => handleEstado(pedido)}>{estado}</button>
    </div>
  )
}

export default PedidoList