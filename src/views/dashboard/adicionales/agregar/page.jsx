import React, { useState } from 'react';
import { setNuevoAdicional } from '../../../../../api/adicionales/setNuevoAdicional';

function AltaAdicional() {
    const [adicional, setAdicional] = useState({
        nombre: '',
        estado: false,
        precio: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setAdicional({ ...adicional, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setNuevoAdicional(adicional);
            alert("Adicional guardado exitosamente")
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud.
            console.error('Error al crear el adicional', error);
        }
    };

    return (
        <main>
            <div className='container text-center'>
                <h1 className='text-center mx-4'>Agregar Adicional</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={adicional.nombre}
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
                            value={adicional.precio}
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
                                checked={adicional.estado}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Guardar Adicional</button>
                </form>
            </div>
        </main>
    );
}

export default AltaAdicional;
