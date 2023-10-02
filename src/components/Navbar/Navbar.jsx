import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { siteConfig } from '../../../config/siteConfig'
import "./Navbar.css"
import { logout } from '../../../api/login/logout';
// import PedidosContainer from '../../views/Pedidos/components/PedidosContainer/PedidosContainer'

function Navbar() {
    let navigate = useNavigate()
    const cerrarSesion = () => {
        logout()
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto"> 
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Configurador
                            </a>
                            <ul className="dropdown-menu">
                                {siteConfig.configuradorItems.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        className="dropdown-item"
                                        to={`${item.href}`}
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav mx-auto"> {/* Alinea en el centro */}
                        {siteConfig.navMenuItems.map((item, index) => (
                            <NavLink
                                key={index}
                                className={({ isActive, isPending }) =>
                                    isPending ? "nav-link pending" : isActive ? "nav-link active" : "nav-link"
                                }
                                to={`${item.href}`}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </ul>
                    <a className="nav-link" role="button" onClick={cerrarSesion}>
                        Cerrar sesión
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar