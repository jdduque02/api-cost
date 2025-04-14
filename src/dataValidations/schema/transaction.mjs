import zod from 'zod';
//El código define un esquema para un objeto de transacción utilizando la biblioteca Zod. El esquema especifica los tipos esperados y las reglas de validación para cada propiedad del objeto de transacción.
const schemaTransaction = zod.object({
    name: zod.string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
    }),
    valueTransaction: zod.number({
        invalid_type_error: 'valueTransaction must be a number',
        required_error: 'valueTransaction is required',
    }),
    addressee: zod.string({
        invalid_type_error: 'addressee must be a string',
    }),
    sourceBank: zod.string({
        invalid_type_error: 'sourceBank must be a string',
    }),
    sourceAccount: zod.string({
        invalid_type_error: 'sourceAccount must be a string',
    }),
    destinationAccount: zod.string({
        invalid_type_error: 'destinationAccount must be a string',
    }),
    destinationBank: zod.string({
        invalid_type_error: 'destinationBank must be a string',
    }),
    categoryId: zod.string({
        invalid_type_error: 'categoryId must be a string',
        required_error: 'categoryId is required',
    }),
    subcategoryId: zod.string({
        invalid_type_error: 'subcategoryId must be a string',
        required_error: 'subcategoryId is required',
    }),

    userId: zod.string({
        invalid_type_error: 'userId must be a string',
        required_error: 'userId is required',
    }),

    annotation: zod.string({
        invalid_type_error: 'annotation must be a string',
    }),

    created_at: zod.date({
        invalid_type_error: 'created_at must be a date',
    }),

    update_at: zod.date({
        invalid_type_error: 'update_at must be a date',
    }),
});

export function validateSchemaTransaction(input) {
    return schemaTransaction.safeParse(input)
}
export function validateSchemaPartialTransaction(input) {
    try {
        return schemaTransaction.partial().safeParse(input)
    } catch (error) {
        return { error }
    }
}