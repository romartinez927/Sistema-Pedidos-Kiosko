import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
import mongoosePaginate from "mongoose-paginate-v2"
import { DaoMongoose } from "./DaoMongoose.js"

const productsCollection = 'products'

const productSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: Boolean, default: true },
}, { versionKey: false })

productSchema.plugin(mongooseAggregatePaginate)
productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productsCollection, productSchema)

export const productosDaoMongoose = new DaoMongoose(productModel)