import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getProductos } from '../../../../../api/getProductos';
import { siteConfig } from '../../../../../config/siteConfig';
import { useNavigate } from 'react-router-dom';

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
    return (
        <main>
            <div className='row mt-5'>
                <button className='w-25' onClick={handleClick}>Agregar producto</button>
            </div>
            <h1 className='text-center'>Listado de Productos</h1>
            <div className='d-flex justify-content-center flex-wrap'>
                {
                    isLoading ? "Cargando..." :
                        <>
                            <ul>
                                {
                                    productos?.map((producto) => (
                                        <li key={producto?.id}>
                                            <span>{producto?.nombre}</span>
                                            <Link style={{ marginLeft: 20, cursor: 'pointer' }} to={`${siteConfig.links.productos_editar}/${producto.id}`}>editar</Link>
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