import React, { useEffect, useState } from 'react'
import { getProducto } from '../../../../../api/productos/getProducto';
import { updateProducto } from '../../../../../api/productos/updateProducto';
import { useParams } from 'react-router-dom';
import { getAderezos } from '../../../../../api/aderezos/getAderezos';
import { getAdicionales } from '../../../../../api/adicionales/getAdicionales';

const EditarProducto = () => {
    let { productoId } = useParams();
    const [adicionales, setAdicionales] = useState(null)
    const [aderezos, setAderezos] = useState(null)
    const [arrayAderezos, setArrayAderezos] = useState([]);
    const [arrayAdicionales, setArrayAdicionales] = useState([]);
    const [producto, setProducto] = useState({
        nombre: '',
        estado: false,
        adicionalesPredeterminados: arrayAdicionales,
        aderezosPredeterminados: arrayAderezos
    });
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchProducto() {
            try {
                const data = await getProducto(productoId);
                setProducto(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducto();
    }, [productoId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setProducto({ ...producto, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProducto(productoId, producto);
            alert("Producto guardado exitosamente")
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud.
            console.error('Error al crear el producto', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const dataAderezos = await getAderezos()
            setAderezos(dataAderezos)
            const dataAdicionales = await getAdicionales()
            setAdicionales(dataAdicionales)
        }
        fetchData()
    }, [])

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
        setProducto({ ...producto, adicionalesPredeterminados: arrayAdicionales, aderezosPredeterminados: arrayAderezos })
    }, [arrayAderezos, arrayAdicionales])


    return (
        <main>
            <h1 className='text-center'>Editar producto</h1>
            <div className='d-flex justify-content-center flex-wrap'>
                {
                    isLoading ? "Cargando..." :
                        <>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={producto?.nombre}
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
                                            checked={producto?.estado}
                                            onChange={handleChange}
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
                                            defaultChecked={
                                                producto?.aderezosPredeterminados?.some((item) => item.id === aderezo.id)
                                            }
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
                                            defaultChecked={
                                                producto?.adicionalesPredeterminados?.some((item) => item.id === adicional.id)
                                            }
                                            onChange={(e) => handleCheckboxChangeAdicionales(e)}
                                        />
                                    </div>
                                ))}
                                <button type="submit">Guardar Producto</button>
                            </form>
                        </>
                }
            </div>
        </main>
    )
}

export default EditarProducto