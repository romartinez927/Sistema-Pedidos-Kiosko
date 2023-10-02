import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { siteConfig } from '../../../../../config/siteConfig';
import { useNavigate } from 'react-router-dom';
import { getAderezos } from '../../../../../api/aderezos/getAderezos';
import { deleteAderezo } from '../../../../../api/aderezos/deleteAderezo';

const ListaAderezos = () => {
    const [aderezos, setAderezos] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const handleEliminarAderezo = (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este aderezo?');

        if (confirmacion) {
            deleteAderezo(id)
        }
    };
    
    useEffect(() => {
        async function fetchAderezos() {
            try {
                const data = await getAderezos();
                setAderezos(data);
            } catch (error) {
                console.error("Error fetching aderezos:", error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchAderezos();
    }, [handleEliminarAderezo]);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${siteConfig.links.aderezos_agregar}`);
    };

    return (
        <main>
            <h1 className='text-center'>Listado de Aderezos</h1>
            <div className='d-flex justify-content-center flex-column'>
                {
                    isLoading ? "Cargando..." :
                        <>
                            <ul className='mx-auto'>
                                {
                                    aderezos?.map((aderezo) => (
                                        <li key={aderezo?.id}>
                                            <span>{aderezo?.nombre}</span>
                                            <Link style={{ marginLeft: 20, cursor: 'pointer' }} to={`${siteConfig.links.aderezos_editar}/${aderezo.id}`}>editar</Link>
                                            <button
                                                className="btn btn-link text-danger fw-semibold"
                                                onClick={() => handleEliminarAderezo(aderezo.id)}
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
                    <button onClick={handleClick}>Agregar aderezo</button>
                </div>
            </div>
        </main>
    )
}

export default ListaAderezos