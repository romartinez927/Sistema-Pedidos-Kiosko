import './App.css'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PedidosContainer from './components/PedidosContainer/PedidosContainer';
import Prueba from './components/Prueba/Prueba';
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")

function App() {

  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <PedidosContainer />}/>
          <Route path="/prueba" element={ <Prueba />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
