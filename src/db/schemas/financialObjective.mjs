import { Schema, model, dateFns, TIMEZONE } from '../modules.mjs';
const today = new Date();
dateFns.setZone(today, TIMEZONE);
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
        default: "monthly",
        enum: ["daily", "weekly", 'year', 'quarter']
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