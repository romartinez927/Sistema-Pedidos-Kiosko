import { Producto } from "../models/Producto.js"
import { productosRepository } from "../repositories/products.repository.js"

export async function handleGet(req, res, next) {
    try {
        const pedidos = await productosRepository.obtenerTodos()
        res.json(pedidos)
    } catch (error) {
        next(error)
    }
}

export async function handleGetById(req, res, next) {
    try {
        const producto = await productosRepository.obtenerSegunId(req.params.pid)
        res.json(producto)
    } catch (error) {
        next(error)
    }
}

export async function handlePost(req, res, next) {
    try {
        const producto = new Producto(req.body)
        const productoGuardado = await productosRepository.create(producto.datos())
        res.json(productoGuardado)
    } catch (error) {
        next(error)
    }
}

export async function handlePut(req, res, next) {
    try {
        const producto = new Producto(req.body)
        const productoReemplazado = await productosRepository.updateProduct(req.params.pid, producto.datos())
        res.json(productoReemplazado)
    } catch (error) {
        return next(error)  
    }
}

export async function handleDelete(req, res, next) {
    try {
        const borrada = await productosRepository.borrarSegunId(req.params.pid)
        res.json(borrada)
    } catch (error) {
        next(error)
    }
}