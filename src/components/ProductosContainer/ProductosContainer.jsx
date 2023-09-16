import React from 'react'

function ProductosContainer() {
  return (
    <div className='mt-3'>
        <h1 className='text-center'>Lista de Productos</h1>
        <div className='d-flex flex-column justify-content-center align-items-center gap-3 mt-4'>
            <button className='px-5 py-3 fs-3'>Hamburguesa</button>
            <button className='px-5 py-3 fs-3'>Sanguche</button>
            <button className='px-5 py-3 fs-3'>Panchos</button>
            <button className='px-5 py-3 fs-3'>Empanadas</button>
        </div>
    </div>
  )
}

export default ProductosContainer