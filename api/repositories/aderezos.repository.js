import { aderezosDaoMongoose } from '../dao/mongo/aderezos.dao.mongoose.js'
import { GenericRepository } from './Generic.repository.js'

export const aderezosRepository = new GenericRepository(aderezosDaoMongoose)