import React from 'react'
import PedidosContainer from '../../views/Pedidos/components/PedidosContainer/PedidosContainer'

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/pedidos">Pedidos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/prueba">Prueba</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/productos">Productos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/prueba">Adicionales</a>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Pedidos</button>
                </div>
            </nav>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {/* <PedidosContainer/> */}
                </div>
            </div>
        </>
    )
}

export default Navbar