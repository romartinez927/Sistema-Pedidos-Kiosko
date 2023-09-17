import { Aderezo } from "../models/Aderezo.js"
import { aderezosRepository } from "../repositories/aderezos.repository.js"

export async function handleGet(req, res, next) {
    try {
        const adicionales = await aderezosRepository.obtenerTodos()
        res.json(adicionales)
    } catch (error) {
        next(error)
    }
}

export async function handlePost(req, res, next) {
    try {
        const aderezo = new Aderezo(req.body)
        const aderezoGuardado = await aderezosRepository.create(aderezo.datos())
        res.json(aderezoGuardado)
    } catch (error) {
        next(error)
    }
}