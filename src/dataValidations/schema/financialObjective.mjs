import zod from 'zod';
//El código define un esquema para el objeto "pagos". Se espera que el objeto "pagos" tenga dos propiedades: "pago diario" y "cantidad pagada".
const schemaPayments = zod.object({
    daypayment: zod.date({
        invalid_type_error: 'daypayment must be a date',
        required_error: 'daypayment is required',
    }),
    amountPaid: zod.number({
        invalid_type_error: 'amountPaid must be a number',
        required_error: 'amountPaid is required',
    }).positive(),
}, { message: 'payments must be an object with the required attributes' });

//El código define un esquema para el objeto "schemaFinancialObjective". Este esquema especifica la estructura esperada y los tipos de datos para las propiedades del objeto. Cada propiedad tiene una regla de validación definida usando la biblioteca Zod.
const schemaFinancialObjective = zod.object({
    userId: zod.string({
        invalid_type_error: 'userId must be a string',
        required_error: 'userId is required',
    }).uuid({ message: 'must be an id of a user' }),

    groupId: zod.string({
        invalid_type_error: 'groupId must be a string',
        required_error: 'groupId is required',
    }).uuid({ message: 'must be an id of a group' }),

    categoryId: zod.string({
        invalid_type_error: 'categoryId must be a string',
        required_error: 'categoryId is required',
    }).uuid({ message: 'must be an id of a category' }),

    subcategoryId: zod.string({
        invalid_type_error: 'subcategoryId must be a string',
        required_error: 'subcategoryId is required',
    }).uuid({ message: 'must be an id of a sub category' }),

    monthlyIncome: zod.number({
        invalid_type_error: 'monthlyIncome must be a number',
    }).positive(),

    name: zod.string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
    }),

    typeFinancialObjective: zod.enum(['loan', 'savings', 'goal'], {
        invalid_type_error: 'typeFinancialObjective must be a string',
        required_error: 'typeFinancialObjective is required',
    }),

    totalAmount: zod.number({
        invalid_type_error: 'totalAmount must be a number',
    }).positive(),

    currentBalance: zod.number({
        invalid_type_error: 'currentBalance must be a number',
    }).positive(),

    dueDate: zod.string({
        invalid_type_error: 'dueDate must be a string',
        required_error: 'dueDate is required',
    }),

    payments: schemaPayments,

    owner: zod.string({
        invalid_type_error: 'owner must be a string',
        required_error: 'owner is required',
    }),

    endDateFinancialObjective: zod.date({
        invalid_type_error: 'endDateFinancialObjective must be a date',
    }),

    frequency: zod.enum(
        ['daily', 'weekly', 'year', 'quarter'],
        {
            invalid_type_error: 'frequency must be a string',
        }),

    interest: zod.number({
        invalid_type_error: 'interest must be a number',
    }).positive(),

    fees: zod.number({
        invalid_type_error: 'fees must be a number',
    }).positive(),

    valueMonthlyFee: zod.number({
        invalid_type_error: 'valueMonthlyFee must be a number',
    }).positive(),

    created_at: zod.date({
        invalid_type_error: 'created_at must be a date',
    }),

    update_at: zod.date({
        invalid_type_error: 'update_at must be a date',
    }),
});

export function validateSchemaFinancialObjective(input) {
    return schemaFinancialObjective.safeParse(input)
}
export function validateSchemaPartialFinancialObjective(input) {
    try {
        return schemaFinancialObjective.partial().safeParse(input)
    } catch (error) {
        return { error }
    }
}

export function validateSchemaPayments(input) {
    return schemaPayments.safeParse(input)
}
export function validateSchemaPartialPayments(input) {
    try {
        return schemaPayments.partial().safeParse(input)
    } catch (error) {
        return { error }
    }
}