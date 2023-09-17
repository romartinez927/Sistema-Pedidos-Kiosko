import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import HacerPedido from '../../modal/HacerPedido';
import { getProductos } from '../../../../../api/getProductos';

function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleProductClick = (producto) => {
    setSelectedProduct(producto)
  }  

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

  return (
    <div className='mt-3'>
      {/* PRODUCTOS */}
      <h1 className='text-center'>Lista de Productos</h1>
      <div className='d-flex flex-column justify-content-center align-items-center gap-3 mt-4'>
        {
          productos.map((producto, index) => (
            <button 
              key={index} 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal" 
              className='px-5 py-3 fs-3'
              onClick={() => handleProductClick(producto)}>
                {producto.nombre}
            </button>
          ))
        }
      </div>

      {/* MODAL PARA HACER PEDIDO */}
      <HacerPedido producto={selectedProduct}/>
    </div>
  )
}

export default ProductosContainer