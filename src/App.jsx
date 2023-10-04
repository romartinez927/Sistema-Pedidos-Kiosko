import './App.css'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PedidosContainer from './views/Pedidos/components/PedidosContainer/PedidosContainer';
import Prueba from './views/Prueba/Prueba';
import io from "socket.io-client"
import ProductosContainer from './views/Home/components/ProductosContainer/ProductosContainer';
import ListaProductos from './views/dashboard/productos/lista/page';
import EditarProducto from './views/dashboard/productos/editar/page';
//const socket = io.connect(`${import.meta.env.VITE_API_SOCKET}`)
import AltaProducto from './views/dashboard/productos/agregar/page';
import ListaAdicionales from './views/dashboard/adicionales/lista/page';
import EditarAdicional from './views/dashboard/adicionales/editar/page';
import AltaAdicional from './views/dashboard/adicionales/agregar/page';
import ListaAderezos from './views/dashboard/aderezos/lista/page';
import AltaAderezo from './views/dashboard/aderezos/agregar/page';
import EditarAderezo from './views/dashboard/aderezos/editar/page';
import Login from './views/Login/components/Login';
import { UserProvider } from '../context/UserContext';
import { ProtectedRoute } from './components/routers/ProtectedRouter';
const socket = io.connect(`${import.meta.env.VITE_API_URL}`)

function App() {

    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="" element={<ProductosContainer />} />
                        <Route path="/pedidos" element={<PedidosContainer />} />
                        <Route path="/prueba" element={<Prueba />} />
                        <Route path="/aderezos" element={<ListaAderezos />} />
                        <Route path="/aderezos/agregar" element={<AltaAderezo />} />
                        <Route path="/aderezos/editar/:aderezoId" element={<EditarAderezo />} />
                        <Route path="/adicionales" element={<ListaAdicionales />} />
                        <Route path="/adicionales/agregar" element={<AltaAdicional />} />
                        <Route path="/adicionales/editar/:adicionalId" element={<EditarAdicional />} />
                        <Route path="/productos" element={<ListaProductos />} />
                        <Route path="/productos/agregar" element={<AltaProducto />} />
                        <Route path="/productos/editar/:productoId" element={<EditarProducto />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
