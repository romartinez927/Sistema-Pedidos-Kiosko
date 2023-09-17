import React, {useEffect, useState} from 'react'
import { getProducto } from '../../../../../api/getProducto';
import { useParams } from 'react-router-dom';

const EditarProducto = () => {
    let { productoId } = useParams();
    const [producto, setProducto] = useState({});
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
    return (
        <main>
        <h1 className='text-center'>Editar producto</h1>
        <div className='d-flex justify-content-center flex-wrap'>
            {
                isLoading ? "Cargando..." :
                    <>
                        <ul>
                            <li>Nombre: {producto.nombre}</li>
                            <li>Estado: {producto.estado ? 'Activo' : "Inactivo"}</li>
                        </ul>
                    </>
            }
        </div>
    </main>
    )
}

export default EditarProducto