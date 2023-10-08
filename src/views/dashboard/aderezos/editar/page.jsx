import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAderezo } from '../../../../../api/aderezos/getAderezo';
import { updateAderezo } from '../../../../../api/aderezos/updateAderezo';

const EditarAderezo = () => {
    let { aderezoId } = useParams();
    const [aderezo, setAderezo] = useState({
        nombre: '',
        estado: true,
    });
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function fetchAderezo() {
            try {
                const data = await getAderezo(aderezoId);
                setAderezo(data);
            } catch (error) {
                console.error("Error fetching aderezos:", error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchAderezo();
    }, [aderezoId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setAderezo({ ...aderezo, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAderezo(aderezoId, aderezo);
            alert("Aderezo guardado exitosamente")
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud.
            console.error('Error al crear el aderezo', error);
        }
    };

    return (
        <main>
            <h1 className='text-center'>Editar aderezo</h1>
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
                                        value={aderezo?.nombre}
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
                                            checked={aderezo?.estado}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <button type="submit">Guardar Aderezo</button>
                            </form>
                        </>
                }
            </div>
        </main>
    )
}

export default EditarAderezo