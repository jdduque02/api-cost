import {Schema, model} from 'mongoose';

const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    remember: {
        type: Boolean,
        default: false
    },
    description: {
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
    }
});
export default model('Notification', notificationSchema);