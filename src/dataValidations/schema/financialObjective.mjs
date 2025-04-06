import { z } from 'zod';

// Esquema para pagos
const schemaPayments = z.object({
    daypayment: z.string({
        invalid_type_error: 'daypayment must be a date',
        required_error: 'daypayment is required',
    }),
    amountPaid: z.number({
        invalid_type_error: 'amountPaid must be a number',
        required_error: 'amountPaid is required',
    }).positive(),
}, { message: 'payments must be an object with the required attributes' });

// Esquema principal
const schemaFinancialObjective = z.object({
    userId: z.string({
        invalid_type_error: 'userId must be a string',
        required_error: 'userId is required',
    }),

    categoryId: z.string({
        invalid_type_error: 'categoryId must be a string',
        required_error: 'categoryId is required',
    }),

    subcategoryId: z.string({
        invalid_type_error: 'subcategoryId must be a string',
        required_error: 'subcategoryId is required',
    }),

    name: z.string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
    }),

    typeFinancialObjective: z.enum(['loan', 'savings', 'goal'], {
        invalid_type_error: 'typeFinancialObjective must be a string',
        required_error: 'typeFinancialObjective is required',
    }),

    totalAmount: z.number({
        invalid_type_error: 'totalAmount must be a number',
    }).positive(),

    currentBalance: z.number({
        invalid_type_error: 'currentBalance must be a number',
    }).positive(),

    dueDate: z.number({
        invalid_type_error: 'dueDate must be a number',
        required_error: 'dueDate is required',
    }),

    payments: z.array(schemaPayments), 

    owner: z.string({
        invalid_type_error: 'owner must be a string',
        required_error: 'owner is required',
    }),

    frequency: z.enum(
        ['daily', 'weekly', 'year', 'quarter', 'monthly'],
        {
            invalid_type_error: 'frequency must be a string',
        }),

    interest: z.number({
        invalid_type_error: 'interest must be a number',
    }),

    fees: z.number({
        invalid_type_error: 'fees must be a number',
    }),

    valueMonthlyFee: z.number({
        invalid_type_error: 'valueMonthlyFee must be a number',
    }).positive(),

    created_at: z.date({
        invalid_type_error: 'created_at must be a date',
    }),

    update_at: z.date({
        invalid_type_error: 'update_at must be a date',
    }),
});

// Funciones de validación (se mantienen igual)
export function validateSchemaFinancialObjective(input) {
    return schemaFinancialObjective.safeParse(input);
}

export function validateSchemaPartialFinancialObjective(input) {
    try {
        return schemaFinancialObjective.partial().safeParse(input);
    } catch (error) {
        return { error };
    }
}

export function validateSchemaPayments(input) {
    return schemaPayments.safeParse(input);
}

export function validateSchemaPartialPayments(input) {
    try {
        return schemaPayments.partial().safeParse(input);
    } catch (error) {
        return { error };
    }
}