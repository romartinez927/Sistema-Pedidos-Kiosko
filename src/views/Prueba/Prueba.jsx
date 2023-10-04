import { useEffect } from "react"
import io from "socket.io-client"
const socket = io.connect('https://sistema-pedidos.onrender.com')

function Prueba() {
  const sendMessage = () => {
    socket.emit("send_prueba", {message: "nuevo pedido"})
  }
  
  useEffect(() => {
    socket.on("enviar_estado", (data) => {
      alert("pedido " + data.message)
    })
  }, [socket])

  return (
    <div>
      <button onClick={sendMessage}>Enviar</button>
    </div>
  )
}

export default Prueba