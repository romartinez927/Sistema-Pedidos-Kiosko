import React, { useState } from 'react'
import "./PedidoList.css"
import { setEstadoPedido } from '../../../../../api/pedidos/setEstadoPedido';

function PedidoList( {pedido} ) {
  const { titulo, cantidad, adicionales, aderezos, nota } = pedido;
  const [estado, setEstado] = useState(pedido.estado)

  const handleEstado = async(pedido) => {
    const nuevoEstado = await setEstadoPedido(pedido._id)
    setEstado(nuevoEstado.estado)
    if (nuevoEstado) {
      const newEstado = estado
      // socket.emit("send_message", { message: newEstado})
    }
  }

  return (
    <div style={{ flex: '0 0 22%' }} className="d-flex flex-column justify-content-center card-pedidos p-4 m-2 border rounded bg-white">
      {/* PEDIDO */}
      <h4 className='text-start'>{titulo} ({cantidad}x)</h4>
      <div>
        <h5>{ adicionales.length > 0 && "Adicionales" }</h5>
        <div className="chip">
          {
            adicionales.map((adicional, index) => (
              <p key={index}>{adicional.nombre}</p>
            ))
          }
        </div> 
      </div>
      <div>
        <h5>{ adicionales.length > 0 && "Aderezos" }</h5>
        <div className='chip'>
          {
            aderezos.map((aderezo, index) => (
              <p key={index}>{aderezo.nombre}</p>
            ))
          }
        </div>
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
      <button className="mt-1" onClick={() => handleEstado(pedido)}>{estado}</button>
    </div>
  )
}

export default PedidoList