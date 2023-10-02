import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAderezos } from '../../../../api/aderezos/getAderezos'
import { getAdicionales } from '../../../../api/adicionales/getAdicionales'
import { setNuevoPedido } from '../../../../api/pedidos/setNuevoPedido'
import io from "socket.io-client"
const socket = io.connect(`${import.meta.env.VITE_API_SOCKET}`)
import "./hacerPedido.css"

function HacerPedido({ producto }) {
    const [adicionales, setAdicionales] = useState(null)
    const [aderezos, setAderezos] = useState(null)
    const [arrayAdicionales, setArrayAdicionales] = useState([])
    const [arrayAderezos, setArrayAderezos] = useState([])
    const [cantidad, setCantidad] = useState(1)
    const [formData, setFormData] = useState({
        titulo: "",
        cantidad: cantidad,
        adicionales: arrayAdicionales,
        aderezos: arrayAderezos,
        product_id: "",
        nota: "",
    })
 
    function handleAdd() {
        setCantidad(cantidad + 1)
        setFormData({ ...formData, cantidad: cantidad})
    }

    function handleSubstract() {
        setCantidad(cantidad - 1)
        setFormData({ ...formData, cantidad: cantidad})
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleCheckboxChangeAderezos = (e) => {
        const { value, id, checked } = e.target;
        if (checked) {
            setArrayAderezos([...arrayAderezos, { id: value, nombre: id }]);
        } else {
            setArrayAderezos(arrayAderezos.filter((item) => item !== value));
        }
    }

    const handleCheckboxChangeAdicionales = (e) => {
        const { value, id, checked } = e.target;
        if (checked) {
            setArrayAdicionales([...arrayAdicionales, { id: value, nombre: id }]);
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

    const enviarPedido = (formData) => {
        setNuevoPedido(formData)
        socket.emit("send_prueba", { message: "nuevo pedido" })
        alert("Pedido creado exitosamente")
    };

    const handlePedido = (e) => {
        e.preventDefault();
        enviarPedido(formData)
    }

    useEffect(() => {
        if (producto && producto.id) {
            setFormData(prevFormData => ({
                ...prevFormData,
                product_id: producto.id,
                titulo: producto.nombre
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
                            {/* CANTIDAD */}
                            <div className="d-flex justify-content-between mb-2">
                                <h5>Unidades</h5>
                                <div class="col-3 p-1 d-flex justify-content-center my-auto btn-contador-container">
                                    <button class="btn-contador" type="button" disabled={cantidad === 0} onClick={handleSubstract}>-</button>
                                    <p class="px-3 my-auto">{cantidad}</p>
                                    <button class="btn-contador" type="button" onClick={handleAdd}>+</button>
                                </div>
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
                                            defaultChecked={
                                                producto?.adicionalesPredeterminados?.some((item) => item.id === adicional.id)
                                            }
                                            onChange={(e) => handleCheckboxChangeAdicionales(e)}
                                            id={adicional.nombre}
                                            value={adicional.id}
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
                                            defaultChecked={
                                                producto?.aderezosPredeterminados?.some((item) => item.id === aderezo.id)
                                            }
                                            onChange={(e) => handleCheckboxChangeAderezos(e)}
                                            id={aderezo.nombre}
                                            name={aderezo.nombre}
                                            value={aderezo._id}
                                        />
                                        <label className="form-check-label" htmlFor={aderezo.nombre}>{aderezo.nombre}</label>
                                    </div>
                                ))
                            }
                            <div className='d-flex flex-column'>
                                <label htmlFor="nota">Nota:</label>
                                <textarea 
                                    name="nota"
                                    value={formData.nota}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Enviar Pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default HacerPedido