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
      {/* PRODUCTOS */}
      <h1 className='text-center'>Lista de Productos</h1>
      <div className='d-flex flex-column justify-content-center align-items-center gap-3 mt-4'>
        {
          productos.map((producto, index) => (
            <button key={index} data-bs-toggle="modal" data-bs-target="#exampleModal" className='px-5 py-3 fs-3'>{producto.nombre}</button>
          ))
        }
      </div>

      {/* MODAL PARA HACER PEDIDO */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductosContainer