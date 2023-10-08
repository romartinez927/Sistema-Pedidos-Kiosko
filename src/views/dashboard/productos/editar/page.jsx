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
        estado: true,
        precio: '',
        adicionalesPredeterminados: '',
        aderezosPredeterminados: ''
    });
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function fetchProducto() {
            try {
                const data = await getProducto(productoId);
                setProducto(data);
                console.log(producto)
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
        setArrayAderezos(producto.aderezosPredeterminados)
        setArrayAderezos(prevArrayAderezos => {
            if (checked) {
                return [...prevArrayAderezos, { id: value, nombre: name }];
            } else {
                return prevArrayAderezos.filter(item => item.id !== value);
            }
        });
        console.log('Array Aderezos:', arrayAderezos);
    }
    
    const handleCheckboxChangeAdicionales = (e) => {
        const { value, checked, name } = e.target;
        setArrayAdicionales(producto.adicionalesPredeterminados)
        setArrayAdicionales(prevArrayAdicionales => {
            if (checked) {
                return [...prevArrayAdicionales, { id: value, nombre: name }];
            } else {
                return prevArrayAdicionales.filter(item => item.id !== value);
            }
        });
        console.log('Array Adicionales:', arrayAdicionales);
    };
    
    useEffect(() => {
        setProducto(prevProducto => ({
            ...prevProducto,
            aderezosPredeterminados: [...arrayAderezos],
            adicionalesPredeterminados: [...arrayAdicionales]
        }));
    }, [arrayAderezos, arrayAdicionales]);
    console.log(producto)

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
                                    <label htmlFor="precio">Precio:</label>
                                    <input
                                        type="number"
                                        id="precio"
                                        name="precio"
                                        value={producto?.precio}
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
                                        <label htmlFor={aderezo.id}>{aderezo.nombre}</label>
                                        <input
                                            type="checkbox"
                                            id={aderezo.id}
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
                                    <div key={adicional.id}>
                                        <label >{adicional.nombre}</label>
                                        <input
                                            type="checkbox"
                                            value={adicional.id}
                                            id={adicional.id}
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