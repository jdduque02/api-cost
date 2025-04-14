import { Schema, model } from 'mongoose';
const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);
/* Este modelo almacena detalles de las transacciones financieras realizadas por el usuario.
categoryId: La categoría de la transacción (por ejemplo, alimentos, alquiler, ingresos).
Subcategory: La subcategoría de la transacción (opcional).
Name: El nombre o descripción de la transacción.
userId: La referencia al usuario que realizó la transacción.
Annotation: Comentarios o notas adicionales sobre la transacción.
Id: Un identificador único para la transacción.
dateIngress: La fecha de ingreso de la transacción.
datePayment: La fecha de pago o vencimiento de la transacción (opcional).
monthly: Un indicador que podría indicar si la transacción es mensual.
created_at: La fecha y hora en que se creó la transacción.
update_at: La fecha y hora de la última actualización de la transacción.
 */
const transactionSchema = Schema({
    categoryId: {
        type: String,
        required: [true, 'La categoria es necesario'],
    },
    subcategoryId: {
        type: String,
        required: [true, 'La subcategoria es necesario'],
    },
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    userId: {
        type: String,
        required: [true, 'El usuario es necesario'],
    },
    // valor de la transaccion
    valueTransaction: {
        type: Number,
        required: [true, 'El valor es necesario'],
    },
    // destinatario
    addressee: {
        type: String,
    },
    // cuenta de origen
    sourceAccount: {
        type: String,
    },
    // cuenta de destino
    destinationAccount: {
        type: String,
    },
    // banco de destino
    destinationBank: {
        type: String,
    },
    // banco de origen
    sourceBank: {
        type: String,
    },
    annotation: {
        type: String,
        default: ' '
    },
    created_at: {
        type: Date,
        default: today
    },
    update_at: {
        type: Date,
        default: today
    },
}, { versionKey: false });

export default model('transaction', transactionSchema);