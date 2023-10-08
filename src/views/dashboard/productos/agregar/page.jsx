import React, { useState, useEffect } from 'react';
import { setNuevoProducto } from '../../../../../api/productos/setNuevoProducto';
import { getAderezos } from '../../../../../api/aderezos/getAderezos'
import { getAdicionales } from '../../../../../api/adicionales/getAdicionales'

function AltaProducto() {
    const [adicionales, setAdicionales] = useState(null)
    const [aderezos, setAderezos] = useState(null)
    const [arrayAderezos, setArrayAderezos] = useState([]);
    const [arrayAdicionales, setArrayAdicionales] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        estado: true,
        precio: '',
        adicionalesPredeterminados: arrayAdicionales,
        aderezosPredeterminados: arrayAderezos
    });


    useEffect(() => {
        async function fetchData() {
            const dataAderezos = await getAderezos()
            setAderezos(dataAderezos)
            const dataAdicionales = await getAdicionales()
            setAdicionales(dataAdicionales)
        }
        fetchData()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setNuevoProducto(formData);
            alert("Producto guardado exitosamente")
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud.
            console.error('Error al crear el producto', error);
        }
    };

    const handleCheckboxChangeAderezos = (e) => {
        const { value, checked, name } = e.target;
        setArrayAderezos(prevArrayAderezos => {
            if (checked) {
                return [...prevArrayAderezos, { id: value, nombre: name }];
            } else {
                return prevArrayAderezos.filter(item => item.id !== value);
            }
        });
    }
    
    const handleCheckboxChangeAdicionales = (e) => {
        const { value, checked, name } = e.target;
        setArrayAdicionales(prevArrayAdicionales => {
            if (checked) {
                return [...prevArrayAdicionales, { id: value, nombre: name }];
            } else {
                return prevArrayAdicionales.filter(item => item.id !== value);
            }
        });
    };

    useEffect(() => {
        setFormData({ ...formData, adicionalesPredeterminados: arrayAdicionales, aderezosPredeterminados: arrayAderezos })
    }, [arrayAderezos, arrayAdicionales])

    return (
        <main>
            <div className='container text-center'>
                <h1 className='text-center mx-4'>Agregar Producto</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="precio">Precio:</label>
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Estado:
                            <input
                                type="checkbox"
                                name="estado"
                            />
                        </label>
                    </div>
                    <h2>Aderezos Predeterminados</h2>
                    {aderezos && aderezos.map(aderezo => (
                        <div key={aderezo.id}>
                            <label htmlFor={`aderezo-${aderezo.id}`}>{aderezo.nombre}</label>
                            <input
                                type="checkbox"
                                id={`aderezo-${aderezo.id}`}
                                value={aderezo.id}
                                name={aderezo.nombre}
                                onChange={(e) => handleCheckboxChangeAderezos(e)}
                            />
                        </div>
                    ))}

                    <h2>Adicionales Predeterminados</h2>
                    {adicionales && adicionales.map(adicional => (
                       <div>
                            <label key={adicional.id}>{adicional.nombre}</label>
                            <input
                                type="checkbox"
                                value={adicional.id}
                                id={`adicional-${adicional.id}`}
                                name={adicional.nombre}
                                onChange={(e) => handleCheckboxChangeAdicionales(e)}
                            />
                       </div>  
                    ))}
                    <button type="submit">Guardar Producto</button>
                </form>
            </div>
        </main>
    );
}

export default AltaProducto;
