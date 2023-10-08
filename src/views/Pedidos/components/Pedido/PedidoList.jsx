import React, { useState } from 'react'
import "./PedidoList.css"
import { setEstadoPedido } from '../../../../../api/pedidos/setEstadoPedido';
import { formatearFechaHora } from '../../../../../utils/formatearFecha';

function PedidoList({ pedido }) {
  const { titulo, cantidad, adicionales, aderezos, nota, total, createdAt } = pedido;
  const [estado, setEstado] = useState(pedido.estado)

  const handleEstado = async (pedido) => {
    const nuevoEstado = await setEstadoPedido(pedido._id)
    setEstado(nuevoEstado.estado)
    if (nuevoEstado) {
      const newEstado = estado
      // socket.emit("send_message", { message: newEstado})
    }
  }
  const fechaFormateada = formatearFechaHora(createdAt);

  return (
      
      <tr className='text-center'>
        {/* PEDIDO */}
        <td>{titulo}</td>
        <td>{cantidad}</td>
        <td>{nota ? nota : ""}</td>
        <td>${total ? total : ""}</td>
        <td>{fechaFormateada.fecha} {fechaFormateada.hora}</td>
      </tr>
  )
}

export default PedidoList