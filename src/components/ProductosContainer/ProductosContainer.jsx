import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function ProductosContainer() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/api/products`).then((response) => {
        setProductos(response.data);
        console.log(response.data);
      })
    }, [])

  return (
    <div className='mt-3'>
        <h1 className='text-center'>Lista de Productos</h1>
        <div className='d-flex flex-column justify-content-center align-items-center gap-3 mt-4'>
            {
                productos.map((producto, index) => (
                    <button key={index} className='px-5 py-3 fs-3'>{producto.nombre}</button>
                ))
            }
        </div>
    </div>
  )
}

export default ProductosContainer