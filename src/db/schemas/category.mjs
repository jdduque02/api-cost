import { Schema, model } from 'mongoose';
const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);
/* Este modelo almacena categorías para las transacciones financieras.
Id: Un identificador único para la categoría.
name: El nombre de la categoría (por ejemplo, Alimentos, Alquiler).
group: Un arreglo de nombres de grupos relacionados (opcional).
description: Una descripción opcional de la categoría.
percentageOptimum: Un porcentaje óptimo (opcional) asociado a la categoría para ayudar con el seguimiento financiero.
 */
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    group: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    percentageOptimum: {
        type: Number,
        default: 0,
    },
    //methods of dine administration
    methods: {
        type: String,
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

export default model('category', categorySchema);