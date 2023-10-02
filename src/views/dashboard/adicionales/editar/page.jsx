import React, { useEffect, useState } from 'react'
import { getAdicional } from '../../../../../api/adicionales/getAdicional';
import { useParams } from 'react-router-dom';
import { updateAdicional } from '../../../../../api/adicionales/updateAdicional';

const EditarAdicional = () => {
    let { adicionalId } = useParams();
    const [adicional, setAdicional] = useState({
        nombre: '',
        estado: false,
    });
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function fetchAdicional() {
            try {
                const data = await getAdicional(adicionalId);
                setAdicional(data);
            } catch (error) {
                console.error("Error fetching adicionales:", error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchAdicional();
    }, [adicionalId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setAdicional({ ...adicional, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAdicional(adicionalId, adicional);
            alert("Adicional guardado exitosamente")
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud.
            console.error('Error al crear el adicional', error);
        }
    };

    return (
        <main>
            <h1 className='text-center'>Editar adicional</h1>
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
                                        value={adicional?.nombre}
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
                                            checked={adicional?.estado}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <button type="submit">Guardar adicional</button>
                            </form>
                        </>
                }
            </div>
        </main>
    )
}

export default EditarAdicional