import { Schema } from 'mongoose'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const aderezosCollection = 'aderezos'

const aderezoSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: Boolean, default: true },
}, {versionKey: false})

export const aderezoModel = mongoose.model(aderezosCollection, aderezoSchema)

export const aderezosDaoMongoose = new DaoMongoose(aderezoModel)