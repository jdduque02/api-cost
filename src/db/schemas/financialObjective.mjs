import { Schema, model } from 'mongoose';
import { zonedTimeToUtc } from 'date-fns-tz';
import * as modules from '../modules.mjs';
const { TIMEZONE } = modules;
let today = new Date();
today = zonedTimeToUtc(today, TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
const financialObjectiveSchema = Schema({
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
    typeFinancialObjective: {
        type: String,
        //loan,savings,goal
        required: true,
    },
    totalAmount: {
        type: Number,
    },
    currentBalance: {
        type: Number,
    },
    dueDate: {
        type: String,
        required: true,
    },
    payments: {
        //[Daypayment, amountPaid]
        type: [Object],
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    endDateFinancialObjective: {
        type: Date,
    },
    frequency: {
        type: String,
        default: 'monthly',
        enum: ['daily', 'weekly', 'year', 'quarter']
    },
    interest: {
        type: Number,
        default: 0,
    },
    fees: {
        type: Number,
        default: 0,
    },
    valueMonthlyFee: {
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
});
export default model('financialObjective', financialObjectiveSchema);