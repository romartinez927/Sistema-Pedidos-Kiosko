import React, { useState } from 'react';
import { setNuevoAderezo } from '../../../../../api/aderezos/setNuevoAderezo';


function AltaAderezo() {
    const [aderezo, setAderezo] = useState({
        nombre: '',
        estado: false,
        precio: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setAderezo({ ...aderezo, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setNuevoAderezo(aderezo);
            alert("Aderezo guardado exitosamente")
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud.
            console.error('Error al crear el aderezo', error);
        }
    };



    
    return (
        <main>
            <div className='container text-center'>
                <h1 className='text-center mx-4'>Agregar Aderezo</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={aderezo.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="precio">Precio:</label>
                        <input
                            type="text"
                            id="precio"
                            name="precio"
                            value={aderezo.precio}
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
                                checked={aderezo.estado}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Guardar Aderezo</button>
                </form>
            </div>
        </main>
    );
}

export default AltaAderezo;