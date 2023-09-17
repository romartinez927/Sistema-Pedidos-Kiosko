import express, { Router } from "express"
import * as aderezosController from "../controllers/aderezos.controller.js"
export const aderezosRouter = Router()

aderezosRouter.get('/', aderezosController.handleGet)
aderezosRouter.post('/', aderezosController.handlePost)

