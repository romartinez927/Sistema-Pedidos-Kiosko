import React, { useEffect, useState } from 'react'
import { getProducto } from '../../../../../api/getProducto';
import { updateProducto } from '../../../../../api/updateProducto';
import { useParams } from 'react-router-dom';

const EditarProducto = () => {
    let { productoId } = useParams();
    const [producto, setProducto] = useState({
        nombre: '',
        estado: false,
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
            console.log('Producto creado con éxito');
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud.
            console.error('Error al crear el producto', error);
        }
    };

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
                                <button type="submit">Guardar Producto</button>
                            </form>
                        </>
                }
            </div>
        </main>
    )
}

export default EditarProducto