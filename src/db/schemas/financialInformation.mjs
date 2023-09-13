import { Schema, model, dateFns, TIMEZONE } from '../modules.mjs';
const today = new Date();
dateFns.setZone(today, TIMEZONE);
const changeHistory = Schema({
    modifiedVariable:{
        type: String,
        required:true,
    },
    dateModification:{
        type:Date,
        required:true,
    },
    valuePrevious:{
        type:String,
        required:true,
    },
    valueNew: {
        type : String ,
        required : true
    }
});

const financialInformationSchema = Schema({
    userId: {
        type : String,
        required : true
    },
    monthlyIncome:{
        type: Number,
        default: 0,
    },
    maxAllowableExpenses:{
        type:Number,
        default: 0,
    },
    openingBalances:{
        type: Number,
        default: 0,
    },
    initialDebts:{
        type: Number,
        default: 0,
    },
    savingsGoal:{
        type: Number,
        default: 0,
    },
    ChangeHistory:[changeHistory],
    created_at: {
        type: Date,
        default: today
    },
    update_at:  {
        type: Date,
        default: today
    },
}, { versionKey: false });

export default model('financialInformation', financialInformationSchema);