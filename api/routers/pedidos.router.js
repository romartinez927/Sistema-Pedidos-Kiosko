import express, { Router } from "express"
import * as pedidosController from "../controllers/pedidos.controller.js"
export const pedidosRouter = Router()

pedidosRouter.get('/', pedidosController.handleGet)

// obtener carrito por id
pedidosRouter.get('/:cid', pedidosController.handleGetById)

// crear carrito
pedidosRouter.post('/', pedidosController.handlePost)

// agregar producto al carrito
pedidosRouter.post('/:cid/products/:pid', pedidosController.handlePostProduct)

// actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body.
// pedidosRouter.put("/:cid/products/:pid", pedidosController.handlePut)

pedidosRouter.put("/:cid/comenzar", pedidosController.handlePutEstado)

// eliminar todos los productos del carrito
pedidosRouter.delete("/:cid",  pedidosController.handleDeleteCart)


// finalizar compra
pedidosRouter.get("/:cid/purchase", pedidosController.finalizePurchase)