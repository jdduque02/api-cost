import { Schema, model, dateFns, TIMEZONE } from '../modules.mjs';

const today = new Date();
dateFns.setZone(today, TIMEZONE);

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