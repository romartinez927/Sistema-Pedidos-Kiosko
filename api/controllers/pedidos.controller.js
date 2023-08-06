import { Pedido } from "../models/Pedido.js"
import { pedidosRepository } from "../repositories/pedidos.repository.js"
import { productosRepository } from "../repositories/products.repository.js"

export async function handleGet(req, res, next) {
    try {
        const pedidos = await pedidosRepository.obtenerTodosPopulate()
        res.json(pedidos)
    } catch (error) {
        next(error)
    }
}

export async function handleGetById(req, res, next) {
    try {
        const pedido = await pedidosRepository.obtenerSegunIdPop(req.params.cid)
        res.json(pedido)
    } catch (error) {
        next(error)
    }
}

export async function handlePost(req, res, next) {
    try {
        const carrito = new Pedido({
            products: []
        })
        const cart = await pedidosRepository.create(carrito.datos())
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

export async function handlePostProduct(req, res, next) {
    try {
        const { cid, pid } = req.params
        const product = await productosRepository.obtenerSegunId(pid)
        if (product._id) {
          const cart = await pedidosRepository.addProductToCart(pid, cid)
          res.json(cart)
          return
        }
        res.json({ msg: `El producto con el id ${pid} no existe.` })
    } catch (error) {
        next(error)
    }
}

export async function handlePut(req, res, next) {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const newCart = await pedidosRepository.updateProduct(cid, pid, quantity)
        res.json(newCart)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function handlePutEstado(req, res, next) {
    const { cid } = req.params
    try {
        const pedido = await pedidosRepository.obtenerSegunId(cid);
        if (!pedido) {
          return res.status(404).json({ message: 'Pedido no encontrado' });
        }
    
        else if (pedido.estado == 'pendiente') {
          pedido.estado = 'preparando';
          await pedido.save();
          return res.status(400).json({ estado: 'preparando' });
        }
    
        else if (pedido.estado == 'preparando') {
            pedido.estado = 'finalizado';
            await pedido.save();
            return res.status(400).json({ estado: 'finalizado' });
          }
    
      } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el pedido', error: error.message });
      }
}

export async function handleDeleteCart(req, res, next) {
    try {
        const { cid } = req.params
        const carrito = await pedidosRepository.obtenerSegunId(cid)
        if (carrito) {
            const newCart = await pedidosRepository.deleteAllProducts(cid)
            res.json(newCart)
        }
        res.json({ msg: `El carrito con el id ${cid} no existe.` })
    } catch (error) {
        next(error)
    }
}


export async function finalizePurchase(req, res, next) {
    const { cid } = req.params

  try {
    const cart = await pedidosRepository.obtenerSegunIdPop(cid)
    const unavaliableProducts = []
    let totalAmount = 0

    for (const item of cart.products) {
      const product = item.product
      const quantity = item.quantity
      const productInStock = await productosRepository.obtenerSegunId(product)

      if (productInStock && productInStock.stock >= quantity) {
        productInStock.stock -= quantity
        await productInStock.save()
        totalAmount += productInStock.price * quantity
        pedidosRepository.deleteProductFromCart(cid, product._id)
      } else {
        unavaliableProducts.push(product)
      }
    }
    
    // ticket
    
    await pedidosRepository.deleteAllProducts(cid)

    res.status(200).send({ message: 'Successful purchase', unavaliableProducts: unavaliableProducts });
  } catch (error) {
    res.status(500).send(error.message)
  }
}