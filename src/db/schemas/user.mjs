import { Schema, model } from 'mongoose';
import { zonedTimeToUtc } from 'date-fns-tz';
import * as modules from '../modules.mjs';
const { TIMEZONE } = modules;
let today = new Date();
today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
const changeHistoryUser = Schema({
    modifiedVariable: {
        type: String,
        required: true,
    },
    dateModification: {
        type: Date,
        required: true,
    },
    valuePrevious: {
        type: String,
        required: true,
    },
    valueNew: {
        type: String,
        required: true
    }
});
const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    numberPhone: {
        type: Number,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    imgProfile: {
        type: String,
    },
    changeHistoryUser: [changeHistoryUser],
    created_at: {
        type: Date,
        default: today
    },
    update_at: {
        type: Date,
        default: today
    },
    state: {
        type: Boolean,
        default: true
    },
    last_conect: {
        type: Date,
        default: today
    },
}, { versionKey: false });

export default model('user', userSchema);