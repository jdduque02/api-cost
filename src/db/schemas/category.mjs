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
        required: [true, 'name category required'],
        unique: true
    },
    /* 
        ingreso 
        egreso
    */
    group: {
        type: String,
        required: [true, 'group category required'],
        options: []
    },
    description: {
        type: String,
        required: [true, 'description category required']
    },
    percentageOptimum: {
        type: Number,
        default: 0,
    },
    /*
        Transferencias Bancarias
        efectivo
        tarjeta
        Pagos Digitales
        Pagos Móviles
        Pagos Online
        Cheques
        Pagos con Criptomonedas 
    */
    methods: {
        type: String,
        options: ['Bank Transfers', 'Cash', 'Card', 'Digital Payments', 'Mobile Payments', 'Online Payments', 'Checks', 'Cryptocurrency Payments']
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