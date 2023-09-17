import express, { Router } from "express"
import * as adicionalesController from "../controllers/adicionales.controller.js"
export const adicionalesRouter = Router()

adicionalesRouter.get('/', adicionalesController.handleGet)
adicionalesRouter.post('/', adicionalesController.handlePost)


