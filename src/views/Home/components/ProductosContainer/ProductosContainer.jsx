import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import HacerPedido from '../../modal/HacerPedido';
import { getProductos } from '../../../../../api/productos/getProductos';
import "./ProductosContainer.css"

function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleProductClick = (producto) => {
    setSelectedProduct(producto)
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getProductos()
      data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setProductos(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className='container mt-5'>
      {/* PRODUCTOS */}
      {/* <h1 className='text-center'>Lista de Productos</h1> */}

      {isLoading ?
        <div className="d-flex mx-auto justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <div className='row d-flex mx-auto flex-wrap mt-5'>
          {productos.map((producto, index) => (
            <div className='col-md-3 mb-4' key={index}>
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModalToggle"
                className='btn btn-productos btn-lg btn-block custom-button w-100 py-4 fw-semibold'
                onClick={() => handleProductClick(producto)}>
                {producto.nombre}
              </button>
            </div>
          ))}
        </div>}

      {/* MODAL PARA HACER PEDIDO */}
      <HacerPedido producto={selectedProduct} />
    </div>
  )
}

export default ProductosContainer