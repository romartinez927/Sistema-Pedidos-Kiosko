import React from 'react'
// import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { siteConfig } from '../../../config/siteConfig'
// import PedidosContainer from '../../views/Pedidos/components/PedidosContainer/PedidosContainer'

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