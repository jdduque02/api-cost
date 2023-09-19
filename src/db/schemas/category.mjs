import { Schema, model } from 'mongoose';

const today = new Date();

const categorySchema = new Schema({
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