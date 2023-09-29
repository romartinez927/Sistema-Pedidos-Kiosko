import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getProductos } from '../../../../../api/productos/getProductos';
import { siteConfig } from '../../../../../config/siteConfig';
import { useNavigate } from 'react-router-dom';
import { deleteProducto } from '../../../../../api/productos/deleteProducto';

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
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${siteConfig.links.productos_agregar}`);
    };

    const handleEliminarProducto = (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este producto?');

        if (confirmacion) {
            deleteProducto(id)
        }
    };
    return (
        <main>
            <h1 className='text-center'>Listado de Productos</h1>
            <div className='d-flex justify-content-center flex-column'>
                {
                    isLoading ? "Cargando..." :
                        <>
                            <ul className='mx-auto'>
                                {
                                    productos?.map((producto) => (
                                        <li key={producto?.id}>
                                            <span>{producto?.nombre}</span>
                                            <Link style={{ marginLeft: 20, cursor: 'pointer' }} to={`${siteConfig.links.productos_editar}/${producto.id}`}>editar</Link>
                                            <button
                                                className="btn btn-link text-danger fw-semibold"
                                                onClick={() => handleEliminarProducto(producto.id)}
                                            >
                                                eliminar
                                            </button>
                                        </li>
                                    ))
                                }

                            </ul>
                        </>
                }

                <div className='mx-auto text-center'>
                    <button onClick={handleClick}>Agregar producto</button>
                </div>

            </div>

        </main>
    )
}

export default ListaProductos