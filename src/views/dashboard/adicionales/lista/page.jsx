import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { siteConfig } from '../../../../../config/siteConfig';
import { useNavigate } from 'react-router-dom';
import { getAdicionales } from '../../../../../api/adicionales/getAdicionales';
import { deleteAdicional } from '../../../../../api/adicionales/deleteAdicional';

const ListaAdicionales = () => {
    const [adicionales, setAdicionales] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const handleEliminarAdicional = (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este adicional?');

        if (confirmacion) {
            deleteAdicional(id)
        }
    };
    useEffect(() => {
        async function fetchAdicionales() {
            try {
                const data = await getAdicionales();
                setAdicionales(data);
            } catch (error) {
                console.error("Error fetching adicionales:", error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchAdicionales();
    }, [handleEliminarAdicional]);
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${siteConfig.links.adicionales_agregar}`);
    };

    
    return (
        <main>
            <h1 className='text-center'>Listado de Adicionales</h1>
            <div className='d-flex justify-content-center flex-column'>
                {
                    isLoading ? "Cargando..." :
                        <>
                            <ul className='mx-auto'>
                                {
                                    adicionales?.map((adicional) => (
                                        <li key={adicional?.id}>
                                            <span>{adicional?.nombre}</span>
                                            <Link style={{ marginLeft: 20, cursor: 'pointer' }} to={`${siteConfig.links.adicionales_editar}/${adicional.id}`}>editar</Link>
                                            <button
                                                className="btn btn-link text-danger fw-semibold"
                                                onClick={() => handleEliminarAdicional(adicional.id)}
                                            >
                                                eliminar
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                }
                <div className='mx-auto'>
                    <button onClick={handleClick}>Agregar adicional</button>
                </div>
            </div>
        </main>
    )
}

export default ListaAdicionales