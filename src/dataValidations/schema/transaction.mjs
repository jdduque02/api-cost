import zod from 'zod';
//El código define un esquema para un objeto de transacción utilizando la biblioteca Zod. El esquema especifica los tipos esperados y las reglas de validación para cada propiedad del objeto de transacción.
const schemaTransaction = zod.object({
    name: zod.string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
    }),

    description: zod.string({
        invalid_type_error: 'description must be a string',
        required_error: 'description is required',
    }),

    categoryId: zod.string({
        invalid_type_error: 'categoryId must be a string',
        required_error: 'categoryId is required',
    }).uuid({ message: 'must be an id of a category' }),

    subcategoryId: zod.string({
        invalid_type_error: 'subcategoryId must be a string',
        required_error: 'subcategoryId is required',
    }).uuid({ message: 'must be an id of a sub category' }),

    userId: zod.string({
        invalid_type_error: 'userId must be a string',
        required_error: 'userId is required',
    }).uuid({ message: 'must be an id of a user' }),

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