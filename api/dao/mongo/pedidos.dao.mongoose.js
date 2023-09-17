import { Schema } from 'mongoose'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const pedidosCollection = 'pedidos'

const pedidoSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "products", required: true },
  estado: { type: String, default: 'empezar preparacion' },
  cantidad: { type: Number, required: true },
  adicionales: { type: Array, default: [] },
  aderezos: { type: Array, default: []}
}, {versionKey: false})

export const pedidoModel = mongoose.model(pedidosCollection, pedidoSchema)

export const pedidosDaoMongoose = new DaoMongoose(pedidoModel)