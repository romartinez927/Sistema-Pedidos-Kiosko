import { adicionalesDaoMongoose } from '../dao/mongo/adicionales.dao.mongoose.js'
import { GenericRepository } from './Generic.repository.js'

export const adicionalesRepository = new GenericRepository(adicionalesDaoMongoose)