import { Schema, model, dateFns, TIMEZONE } from '../modules.mjs';

const today = new Date();
dateFns.setZone(today, TIMEZONE);
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
    numerphone: {
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
    changeHistoryUser:[changeHistoryUser],
    created_at: {
        type: Date,
        default: today
    },
    update_at: {
        type: Date,
        default: today
    },
    last_conect: {
        type: Date,
        default: today
    },
}, { versionKey: false });

export default model('User', userSchema);