import express, { Router } from "express"
import { pedidosRouter } from "./pedidos.router.js"
import { productsRouter } from "./products.router.js"
import { adicionalesRouter } from "./adicionales.router.js"
import { aderezosRouter } from "./aderezos.router.js"

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use("/pedidos", pedidosRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/adicionales", adicionalesRouter)
apiRouter.use("/aderezos", aderezosRouter)