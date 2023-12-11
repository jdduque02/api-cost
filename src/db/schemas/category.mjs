import { Schema, model } from 'mongoose';
import { zonedTimeToUtc } from 'date-fns-tz';
import * as modules from '../modules.mjs';
const { TIMEZONE } = modules;
let today = new Date();
today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');

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
    methods:{
        type:String,
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