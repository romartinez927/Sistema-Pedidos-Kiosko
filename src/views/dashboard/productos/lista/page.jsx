import React, { useState, useEffect } from 'react'
import { getProductos } from '../../../../../api/getProductos';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function fetchProductos() {
            try {
                const data = await getProductos();
                setProductos(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchProductos();
    }, []);
    return (
        <main>
            <h1 className='text-center'>Listado de Productos</h1>
            <div className='d-flex justify-content-center flex-wrap'>
                {
                    isLoading ? "Cargando..." :
                        <>
                            <ul>
                                {
                                    productos?.map((producto, index) => (
                                        <li key={producto?.id}>
                                            <span>{producto?.nombre}</span>
                                            <a href="" style={{marginLeft: 20, cursor: 'pointer'}}>editar</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                }
            </div>
        </main>
    )
}

export default ListaProductos