import { pedidosDaoMongoose } from '../dao/mongo/pedidos.dao.mongoose.js'
import { GenericRepository } from './Generic.repository.js'

class PedidosRepository extends GenericRepository{
    constructor(dao) { super(dao) }
    
    async updateCart(cartId, cart) {
        const result = await this.dao.updateById(cartId, cart)
        return result
    }

    async addProductToCart(productId, cartId) {
    const cart = await this.dao.getById(cartId)
    const product = cart.products.find((item) => item.product == productId)
    if (product) {
        product.cantidad++
    } else {
        let product = { product: productId }
        cart.products.push(product)
    }
    this.updateCart(cartId, cart)
    return cart
}

}

export const pedidosRepository = new PedidosRepository(pedidosDaoMongoose)