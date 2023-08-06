import { Schema } from 'mongoose'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const pedidosCollection = 'pedidos'

const pedidoSchema = new Schema({
  products: { type: Array, default: [], ref: "products" },
  estado: { type: String, default: 'pendiente' },
}, {versionKey: false})

export const pedidoModel = mongoose.model(pedidosCollection, pedidoSchema)

export const pedidosDaoMongoose = new DaoMongoose(pedidoModel)