import zod from 'zod';
//El código define un esquema utilizando la biblioteca Zod para validar y analizar datos. El esquema se llama "changeHistoryInformation" y representa la estructura y las reglas de validación para la información del historial de cambios.
const schemaChangeHistoryInformation = zod.object({
    modifiedVariable: zod.string({
        invalid_type_error: 'modifiedVariable must be a string',
        required_error: 'modifiedVariable is required',
    }),

    valuePrevious: zod.string({
        invalid_type_error: 'valuePrevious must be a string',
        required_error: 'valuePrevious is required',
    }),

    valueNew: zod.string({
        invalid_type_error: 'valueNew must be a string',
        required_error: 'valueNew is required',
    }),

    dateModification: zod.date({
        invalid_type_error: 'dateModification must be a date',
        required_error: 'dateModification is required',
    }),
}, { message: 'changeHistoryUser must be an object with the required attributes' });

//El código define un esquema utilizando la biblioteca Zod para validar y analizar datos. El esquema se denomina `schemaFinancialInformation` y representa la estructura y las reglas de validación de la información financiera.
const schemaFinancialInformation = zod.object({
    userId: zod.string({
        invalid_type_error: 'userId must be a string',
        required_error: 'userId is required',
    }).uuid({ message: 'must be an id of a user' }),

    monthlyIncome: zod.number({
        invalid_type_error: 'monthlyIncome must be a number',
    }).positive(),

    maxAllowableExpenses: zod.number({
        invalid_type_error: 'maxAllowableExpenses must be a number',
    }).positive(),

    openingBalances: zod.number({
        invalid_type_error: 'openingBalances must be a number',
    }).positive(),
    ChangeHistory: schemaChangeHistoryInformation,
    initialDebts: zod.number({
        invalid_type_error: 'initialDebts must be a number',
    }).positive(),

    created_at: zod.date({
        invalid_type_error: 'created_at must be a date',
    }),

    update_at: zod.date({
        invalid_type_error: 'update_at must be a date',
    }),
});

export function validateSchemaFinancialInformation(input) {
    return schemaFinancialInformation.safeParse(input)
}
export function validateSchemaPartialFinancialInformation(input) {
    try {
        return schemaFinancialInformation.partial().safeParse(input)
    } catch (error) {
        return { error }
    }
}

export function validateSchemaChangeHistoryInformation(input) {
    return schemaChangeHistoryInformation.safeParse(input)
}
export function validateSchemaPartialChangeHistoryInformation(input) {
    try {
        return schemaChangeHistoryInformation.partial().safeParse(input)
    } catch (error) {
        return { error }
    }
}