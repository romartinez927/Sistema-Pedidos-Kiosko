import React from 'react'

const ListaProductos = () => {
    const productos = [];
    return (
        <main>
            {/* LISTADO DE PEDIDOS */}
            <h1 className='text-center'>Listado de Productos</h1>
            <div className='d-flex justify-content-center flex-wrap'>
                {
                    productos?.map((producto, index) => (
                        { producto }
                        // <PedidoList
                        //     key={index}
                        //     pedido={pedido}
                        //     socket={socket}
                        // />
                    ))
                }
            </div>
        </main>
    )
}

export default ListaProductos