import { Schema, model } from 'mongoose';
const today = new Date();
today.setUTCHours(today.getUTCHours() - 5);
const changeHistory = Schema({
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
/* 
Este modelo almacena información financiera específica de cada usuario.
_id: El identificador único de la información financiera.
userId: La referencia al usuario al que pertenece esta información financiera.
monthlyIncome: El ingreso mensual del usuario.
maxAllowableExpenses: El gasto máximo permitido por mes.
openingBalances: Los saldos iniciales o saldo inicial de cuentas financieras.
savingsGoal: La meta de ahorro establecida por el usuario.
created_at: La fecha y hora en que se creó esta información financiera.
update_at: La fecha y hora de la última actualización de esta información financiera.
ChangeHistory: Un submodelo que registra cambios históricos en la información financiera, permitiendo un seguimiento de la evolución de las finanzas del usuario.
 */
const financialInformationSchema = Schema({
    userId: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        default: 0,
    },
    maxAllowableExpenses: {
        type: Number,
        default: 0,
    },
    openingBalances: {
        type: Number,
        default: 0,
    },
    initialDebts: {
        type: Number,
        default: 0,
    },
    savingsGoal: {
        type: Number,
        default: 0,
    },
    ChangeHistory: [changeHistory],
    created_at: {
        type: Date,
        default: today
    },
    update_at: {
        type: Date,
        default: today
    },
}, { versionKey: false });

export default model('financialInformation', financialInformationSchema);