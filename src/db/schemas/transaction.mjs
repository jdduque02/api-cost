import { Schema, model } from 'mongoose';
const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);
/* Este modelo almacena detalles de las transacciones financieras realizadas por el usuario.
groupId: Un identificador único para agrupar transacciones relacionadas (opcional).
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
    groupId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    subcategoryId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
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