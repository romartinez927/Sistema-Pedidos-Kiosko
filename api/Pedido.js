import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    nombre: String,
    estado: { type: String, default: 'empezar preparación' },
  }, {timestamps: true});
  
export const Pedido = mongoose.model('Pedido', pedidoSchema);