import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAderezos } from '../../../../api/getAderezos'
import { getAdicionales } from '../../../../api/getAdicionales'
import { setNuevoPedido } from '../../../../api/setNuevoPedido'

function HacerPedido({ producto }) {
    const [adicionales, setAdicionales] = useState(null)
    const [arrayAdicionales, setArrayAdicionales] = useState([])
    const [aderezos, setAderezos] = useState(null)
    const [arrayAderezos, setArrayAderezos] = useState([])
    const [formData, setFormData] = useState({
        cantidad: 1,
        adicionales: arrayAdicionales,
        aderezos: arrayAderezos,
        product_id: ""
    })

    console.log(producto)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleCheckboxChangeAderezos = (e) => {
        const { value, id, checked } = e.target;
        if (checked) {
            setArrayAderezos([...arrayAderezos, {id: value, nombre: id}]);
        } else {
            setArrayAderezos(arrayAderezos.filter((item) => item !== value));
        }
    }

    const handleCheckboxChangeAdicionales = (e) => {
        const { value, id, checked } = e.target;
        if (checked) {
            setArrayAdicionales([...arrayAdicionales, {id: value, nombre: id}]);
        } else {
            setArrayAdicionales(arrayAdicionales.filter((item) => item !== value));
        }
    };

    useEffect(() => {
        setFormData({ ...formData, adicionales: arrayAdicionales, aderezos: arrayAderezos })
    }, [arrayAderezos, arrayAdicionales])
    

    useEffect(() => {
        async function fetchData() {
            const dataAderezos = await getAderezos()
            setAderezos(dataAderezos)
            const dataAdicionales = await getAdicionales()
            setAdicionales(dataAdicionales)
        }
        fetchData()
    }, [])

    const enviarPedido = (formData) => setNuevoPedido(formData);

    const handlePedido = (e) => {
        e.preventDefault();
        enviarPedido(formData)
    }

    useEffect(() => {
        if (producto && producto.id) {
            setFormData(prevFormData => ({
                ...prevFormData,
                product_id: producto.id
            }));
        }
    }, [producto]);

    return (
        <form method="post" onSubmit={handlePedido}>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{producto?.nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" hidden className="form-control" name="product_id" id="product_id" />
                            {/* CANTIDAD */}
                            <h5>Cantidad</h5>
                            <div className="mb-3">
                                <input type="number" className="form-control" onChange={handleChange} name="cantidad" id="cantidad" value={formData?.cantidad} />
                            </div>

                            {/* ADICIONALES */}
                            <h5>Adicionales</h5>
                            {
                                adicionales && adicionales.map((adicional, index) => (
                                    <div key={index} className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            onChange={(e) => handleCheckboxChangeAdicionales(e)}
                                            id={adicional.nombre}
                                            value={adicional._id}
                                        />
                                        <label className="form-check-label" htmlFor={adicional.nombre}>{adicional.nombre}</label>
                                    </div>
                                ))
                            }

                            {/* ADEREZOS */}
                            <h5>Aderezos</h5>
                            {
                                aderezos && aderezos.map((aderezo, index) => (
                                    <div key={index} className="form-check form-switch">
                                        <input className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            onChange={(e) => handleCheckboxChangeAderezos(e)}
                                            id={aderezo.nombre}
                                            name={aderezo.nombre}
                                            value={aderezo._id}
                                        />
                                        <label className="form-check-label" htmlFor={aderezo.nombre}>{aderezo.nombre}</label>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Enviar Pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default HacerPedido