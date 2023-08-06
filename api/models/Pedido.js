export class Pedido {
    #id
    #products
    #estado

    constructor({ products, estado }) {
        this.#products = products
        this.#estado = estado
    }

    get id() { return this.#id }
    get products() { return this.#products }
    get estado() { return this.#estado }

    datos() {
        return {
            id: this.#id,
            products: this.#products,
            estado: this.#estado,
        }
    }
}