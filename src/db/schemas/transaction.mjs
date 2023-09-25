import { Schema, model } from 'mongoose';
import { zonedTimeToUtc } from 'date-fns-tz';
import * as modules from '../modules.mjs';
const { TIMEZONE } = modules;
let today = new Date();
today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
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