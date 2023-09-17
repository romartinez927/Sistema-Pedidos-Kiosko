import './App.css'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PedidosContainer from './components/PedidosContainer/PedidosContainer';
import Prueba from './components/Prueba/Prueba';
import io from "socket.io-client"
import ProductosContainer from './components/ProductosContainer/ProductosContainer';
// const socket = io.connect("https://sistema-pedidos.onrender.com")

function App() {

  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <ProductosContainer />}/>
          <Route path="/pedidos" element={ <PedidosContainer />}/>
          <Route path="/prueba" element={ <Prueba />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
