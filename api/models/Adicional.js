export class Adicional {
    #nombre

    constructor({ nombre }) {
        if (!nombre || typeof nombre !== 'string') throw new Error("falta el titulo")
        this.#nombre = nombre

    }

    get nombre() { return this.#nombre }

    datos() {
        return {
            nombre: this.#nombre,
        }
    }
}