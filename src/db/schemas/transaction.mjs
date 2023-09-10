import { Schema, model, dateFns, TIMEZONE } from '../modules.mjs';

const today = new Date();
dateFns.setZone(today, TIMEZONE);

const transactionSchema = Schema({
    groupId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    Subcategory: {
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
    dateIngress: {
        type: Date,
    },
    datePayment: {
        type: Date,
    },
    monthly: {
        type: Boolean,
        default: false,
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