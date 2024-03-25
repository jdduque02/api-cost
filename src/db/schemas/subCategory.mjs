import { Schema, model } from 'mongoose';
const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);
/* Este modelo almacena subcategorías para las transacciones financieras.
Id: Un identificador único para la subcategoría.
name: El nombre de la subcategoría.
description: Una descripción opcional de la subcategoría.
categoryId: La referencia a la categoría a la que pertenece la subcategoría.
userId: La referencia al usuario al que pertenece la subcategoría.
created_at: La fecha y hora en que se creó la subcategoría.
update_at: La fecha y hora de la última actualización de la subcategoría.
 */
const subCategorySchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
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

export default model('subCategory', subCategorySchema);