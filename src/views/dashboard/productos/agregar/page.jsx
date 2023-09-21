import React, { useState } from 'react';
import { setNuevoProducto } from '../../../../../api/productos/setNuevoProducto';

function AltaProducto() {
    const [producto, setProducto] = useState({
        nombre: '',
        estado: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setProducto({ ...producto, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setNuevoProducto(producto);
            console.log('Producto creado con éxito');
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud.
            console.error('Error al crear el producto', error);
        }
    };

    return (
        <main>
            <div className='container text-center'>
                <h1 className='text-center mx-4'>Agregar Producto</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={producto.nombre}
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
                               
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Adicionales Predeterminados:
                            <input
                                type="text"
                                name="adicionalPredeterminado"
                                
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Aderezos Predeterminados:
                            <input
                                type="text"
                                name="aderezoPredeterminado"
                                
                            />
                        </label>
                    </div>
                    <button type="submit">Guardar Producto</button>
                </form>
            </div>
        </main>
    );
}

export default AltaProducto;
