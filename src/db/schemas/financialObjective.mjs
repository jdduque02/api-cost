import { Schema, model } from 'mongoose';
const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);
/* _id: Identificador único del objetivo financiero.
userId: La referencia al usuario al que pertenece este objetivo financiero.
name: Nombre o descripción del objetivo financiero (por ejemplo, "Vacaciones", "Fondo de emergencia").
type: Tipo de objetivo financiero (por ejemplo, "Deuda" o "Ahorro").
totalAmount: El monto total necesario para alcanzar el objetivo financiero.
currentBalance: El saldo actual acumulado para el objetivo financiero (inicialmente igual al monto total).
created_at: La fecha y hora en que se creó este objetivo financiero.
update_at: La fecha y hora de la última actualización de este objetivo financiero.
 */
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