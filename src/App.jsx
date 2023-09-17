import './App.css'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PedidosContainer from './views/Pedidos/components/PedidosContainer/PedidosContainer';
import Prueba from './views/Prueba/Prueba';
import io from "socket.io-client"
import ProductosContainer from './views/Home/components/ProductosContainer/ProductosContainer';
import ListaProductos from './views/dashboard/productos/lista/page';
import EditarProducto from './views/dashboard/productos/editar/page';
import AgregarProducto from './views/dashboard/productos/agregar/page';
const socket = io.connect(`${import.meta.env.VITE_API_SOCKET}`)
import AltaProducto from './views/dashboard/productos/agregar/page';
// const socket = io.connect(`${import.meta.env.VITE_API_URL}`)


function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductosContainer />} />
                <Route path="/pedidos" element={<PedidosContainer />} />
                <Route path="/prueba" element={<Prueba />} />
                <Route path="/adicionales" element={<Prueba />} />
                <Route path="/productos" element={<ListaProductos />} />
                <Route path="/productos/agregar" element={<AltaProducto />} />
                <Route path="/productos/editar/:productoId" element={<EditarProducto />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
