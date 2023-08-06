import { productosDaoMongoose } from '../dao/mongo/product.dao.mongoose.js'
import { GenericRepository } from './Generic.repository.js'

export const productosRepository = new GenericRepository(productosDaoMongoose)