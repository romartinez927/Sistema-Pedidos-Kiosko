import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function HacerPedido({ producto }) {
    const [adicionales, setAdicionales] = useState(null)
    const [aderezos, setAderezos] = useState(null)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/aderezos`).then((response) => {
            setAderezos(response.data);
        })
        axios.get(`${import.meta.env.VITE_API_URL}/api/adicionales`).then((response) => {
            setAdicionales(response.data);
        })
    }, [])

    

    return (
        <form method="post" id="enviarPedido">
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{producto?.nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* CANTIDAD */}
                            <h5>Cantidad</h5>
                            <div className="mb-3">
                                <input type="number" className="form-control" id="cantidad" />
                            </div>

                            {/* ADICIONALES */}
                            <h5>Adicionales</h5>
                            {
                                adicionales && adicionales.map((adicional, index) => (
                                    <div key={index} className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id={`adicional_${adicional.nombre}`} />
                                        <label className="form-check-label" htmlFor={`adicional_${adicional.nombre}`}>{adicional.nombre}</label>
                                    </div>
                                ))
                            }

                            {/* ADEREZOS */}
                            <h5>Aderezos</h5>
                            {
                                aderezos && aderezos.map((aderezo, index) => (
                                    <div key={index} className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id={`aderezo_${aderezo.nombre}`} />
                                        <label className="form-check-label" htmlFor={`aderezo_${aderezo.nombre}`}>{aderezo.nombre}</label>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Enviar Pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default HacerPedido