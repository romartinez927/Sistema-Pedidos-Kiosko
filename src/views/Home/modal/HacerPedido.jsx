import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAderezos } from '../../../../api/getAderezos'
import { getAdicionales } from '../../../../api/getAdicionales'

function HacerPedido({ producto }) {
    const [adicionales, setAdicionales] = useState(null)
    const [aderezos, setAderezos] = useState(null)
    const [formData, setFormData] = useState({
        cantidad: '',
        adicionales: {},
        aderezos: {},
        product_id: producto?._id
    })

    console.log(formData)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAdicionalChange = (e) => {
        const { id, checked } = e.target;
        
        setFormData(prevFormData => {
          return {
            ...prevFormData,
            adicionales: {
              ...prevFormData.adicionales,
              [id]: checked
            }
          };
        });
      };

      const handleAderezoChange = (e) => {
        const { id, checked } = e.target;
        
        setFormData(prevFormData => {
          return {
            ...prevFormData,
            aderezos: {
              ...prevFormData.aderezos,
              [id]: checked
            }
          };
        });
      };

    useEffect(() => {
        async function fetchData() {
            try {
              const dataAderezos = await getAderezos()
              setAderezos(dataAderezos)
              console.log(aderezos)
              const dataAdicionales = await getAdicionales()
              setAdicionales(dataAdicionales)
            } catch (error) {
                console.error('Error fetching data:', error);
            }   
        }
          fetchData()
    }, [producto])

    const enviarPedido = async (formData) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/pedidos`
    
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: formData
            };
    
            const response = await axios.request(config)
            console.log(response)
            return response
        } catch (error) {
            console.error("Error al crear nueva muestra", error)
            throw error
        }
    }

    const handlePedido = (e) => {
        e.preventDefault();
        const response = enviarPedido(formData)
    }

    console.log(producto?._id)
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
                            <h5>Cantidad</h5>
                            <div className="mb-3">
                                <input type="number" className="form-control" onChange={handleChange} name="cantidad" id="cantidad" />
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
                                            onChange={handleAdicionalChange} 
                                            id={adicional.nombre} 
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
                                            onChange={handleAderezoChange} 
                                            id={aderezo.nombre} 
                                        />
                                        <label className="form-check-label" htmlFor={aderezo.nombre}>{aderezo.nombre}</label>
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