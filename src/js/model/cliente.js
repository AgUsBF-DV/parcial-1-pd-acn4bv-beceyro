// CLASE CLIENTE

export class Cliente {

    // Campos privados
    #id;
    #nombreCompleto;
    #email;
    #direccion;
    #telefono;

    // Constructor
    constructor(id, nombreCompleto = '', email = '', direccion = '', telefono = '') {
        this.#id = id;
        this.#nombreCompleto = String(nombreCompleto);
        this.#email = String(email);
        this.#direccion = String(direccion);
        this.#telefono = String(telefono);
    }

    // Getters (métodos)
    getId() {
        return this.#id;
    }
    getNombreCompleto() {
        return this.#nombreCompleto;
    }
    getEmail() {
        return this.#email;
    }
    getDireccion() {
        return this.#direccion;
    }
    getTelefono() {
        return this.#telefono;
    }

    // Setters (métodos)
    setNombreCompleto(nombreCompleto) {
        this.#nombreCompleto = String(nombreCompleto);
    }
    setEmail(email) {
        this.#email = String(email);
    }
    setDireccion(direccion) {
        this.#direccion = String(direccion);
    }
    setTelefono(telefono) {
        this.#telefono = String(telefono);
    }

    // Mostrar información breve
    mostrarInfo() {
        return `Cliente ID ${this.#id}: ${this.#nombreCompleto} - ${this.#email} - Tel: ${this.#telefono}`;
    }

    armarLabel() {
        return `${this.#nombreCompleto} (Tel.:${this.#telefono})`;
    }

    // Serialización para JSON
    toJSON() {
        return {
            id: this.getId(),
            nombreCompleto: this.getNombreCompleto(),
            email: this.getEmail(),
            direccion: this.getDireccion(),
            telefono: this.getTelefono()
        };
    }
}
