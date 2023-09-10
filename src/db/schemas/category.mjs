import { Schema, model, dateFns, TIMEZONE } from '../modules.mjs';

const today = new Date();
dateFns.setZone(today, TIMEZONE);

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
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
    }
}, { versionKey: false });

export default model('category', categorySchema);