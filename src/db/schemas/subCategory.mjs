import { Schema, model } from 'mongoose';
import { zonedTimeToUtc } from 'date-fns-tz';
import * as modules from '../modules.mjs';
const { TIMEZONE } = modules;
let today = new Date();
today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');

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