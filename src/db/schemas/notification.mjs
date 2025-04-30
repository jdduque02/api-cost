import { Schema, model } from 'mongoose';

const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);

const notificationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    userId: {
        type: String,
        required: [true, 'El usuario es necesario']
    },
    completed: {
        type: Boolean,
        required: [false, 'completado es necesario']
    },
    remember: {
        type: Boolean,
        required: [false, 'recordar es necesario']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es necesario']
    },
    created_at: {
        type: Date,
        default: today
    },
    update_at: {
        type: Date,
        default: today
    }
}, {
    versionKey: false
});
export default model('Notification', notificationSchema);