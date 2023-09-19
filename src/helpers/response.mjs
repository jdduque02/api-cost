
export class Responses {
    //La función `static async ResponseSuccessful({ body, message })` es un método estático de la clase `responses`. Toma un objeto con las propiedades 'cuerpo' y 'mensaje' como parámetro.
    static async Successful({ body, message }) {
        return { ok: true, message, body };
    }
    //La función `static async ResponseError({ body, message })` es un método estático de la clase `responses`. Toma un objeto con las propiedades 'cuerpo' y 'mensaje' como parámetro.
    static async Error({ body, message }) {
        return { ok: false, message, body };
    }
}