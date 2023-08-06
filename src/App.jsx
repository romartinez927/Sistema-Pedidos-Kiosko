import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';
import { Pedido } from '../api/models/Pedido';
import PedidoList from './components/Pedido/PedidoList';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/pedidos`).then((response) => {
      setPedidos(response.data);
      console.log(response.data)
    });
  }, []);


  return (
      <>
        <Navbar/>
        <main className='py-5 px-4'>
          <h1 className='text-center'>Listado de Pedidos</h1>
          <div className='d-flex justify-content-center flex-wrap'>
            {
              pedidos.map((pedido, index) => (
                <PedidoList key={index} pedido={pedido}/>
              ))
            }
            {
              pedidos.map((pedido, index) => (
                <PedidoList key={index} pedido={pedido}/>
              ))
            }
          </div>
        </main>
      </>
  )
}

export default App
