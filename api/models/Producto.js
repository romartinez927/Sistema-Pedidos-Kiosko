export class Producto {
    #nombre
    #cantidad

    constructor({ nombre, cantidad }) {
        if (!nombre || typeof nombre !== 'string') throw new Error("falta el titulo")
        this.#nombre = nombre

        if (!cantidad) throw new Error("falta la cantidad")
        this.#cantidad = cantidad

    }

    get nombre() { return this.#nombre }
    get cantidad() { return this.#cantidad }

    datos() {
        return {
            nombre: this.#nombre,
            cantidad: Number(this.#cantidad),
        }
    }
}