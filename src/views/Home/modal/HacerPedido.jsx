import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAderezos } from '../../../../api/aderezos/getAderezos'
import { getAdicionales } from '../../../../api/adicionales/getAdicionales'
import { setNuevoPedido } from '../../../../api/pedidos/setNuevoPedido'
// import io from "socket.io-client"
import "./hacerPedido.css"

function HacerPedido({ producto }) {
    // const socket = io.connect('https://sistema-pedidos.onrender.com')
    const [adicionales, setAdicionales] = useState(null)
    const [aderezos, setAderezos] = useState(null)
    const [arrayAdicionales, setArrayAdicionales] = useState([])
    const [arrayAderezos, setArrayAderezos] = useState([])
    const [unidades, setUnidades] = useState(1)
    const [formData, setFormData] = useState({
        titulo: "",
        cantidad: unidades,
        adicionales: arrayAdicionales,
        aderezos: arrayAderezos,
        product_id: "",
        nota: "",
    })

    function handleAdd() {
        setUnidades(unidades + 1)
        setFormData({ ...formData, cantidad: unidades })
    }

    console.log(formData)
    function handleSubstract() {
        setUnidades(unidades - 1)
        setFormData({ ...formData, cantidad: unidades })
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
        // socket.emit("send_prueba", { message: "nuevo pedido" })
        alert("Pedido creado exitosamente")
    };

    const handlePedido = (e) => {
        e.preventDefault();
        enviarPedido(formData)
        vaciarPedido()
    }

    function vaciarPedido() {
        setArrayAdicionales([])
        setArrayAderezos([])
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
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 fw-semibold" id="exampleModalToggleLabel">{producto?.nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* CANTIDAD */}
                            <div className="adicionales-container">
                                <div className="py-2 d-flex justify-content-between">
                                    <h5 className='my-auto'>Unidades</h5>
                                    <div className="col-3 p-1 d-flex justify-content-center my-auto btn-contador-container">
                                        <button className="btn-contador" type="button" disabled={unidades === 0} onClick={handleSubstract}>-</button>
                                        <p className="px-3 my-auto">{formData.cantidad}</p>
                                        <button className="btn-contador" type="button" onClick={handleAdd}>+</button>
                                    </div>
                                </div>
                            </div>

                            {/* ADICIONALES */}
                            <div className='adicionales-container'>
                               <div className='py-2 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h5 className='my-auto'>Adicionales</h5>
                                        {formData.adicionales && formData.adicionales.map(adicional => (
                                            <span key={adicional.id}>{adicional.nombre}, </span>
                                        ))}
                                    </div>
                                    <button type="button" className="btn-adicionales" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Seleccionar</button>
                               </div>
                            </div>

                            {/* ADEREZOS */}
                            <div className="adicionales-container">
                                <div className='py-2 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h5 className='my-auto'>Aderezos</h5>
                                        {formData.aderezos && formData.aderezos.map(aderezo => (
                                            <span key={aderezo.id}>{aderezo.nombre}, </span>
                                        ))}
                                    </div>
                                    <button type="button" className="btn-adicionales" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">Seleccionar</button>
                                </div>
                            </div>

                            {/* NOTA */}
                            <div className="adicionales-container">
                                <div className='py-2 d-flex flex-column'>
                                    <label htmlFor="nota" className='fw-semibold'>Notas para este pedido</label>
                                    <textarea
                                        name="nota"
                                        value={formData.nota}
                                        onChange={handleChange}
                                        className="mt-2"
                                        placeholder="Escribe las instrucciones que necesites..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => vaciarPedido()} data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Enviar Pedido</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Adicionales</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel3">Aderezos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default HacerPedido