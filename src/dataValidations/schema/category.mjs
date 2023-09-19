import zod from 'zod';
//El código define un esquema para un objeto de categoría utilizando la biblioteca Zod.
const schemaCategory = zod.object({
    name: zod.string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
    }),
    group: zod.string({
        invalid_type_error: 'group must be a string',
        required_error: 'group is required',
    }).uuid({ message: 'must be an id of a group' }),

    description: zod.string({
        invalid_type_error: 'description must be a string',
        required_error: 'description is required',
    }),

    percentageOptimum: zod.number({
        invalid_type_error: 'percentageOptimum must be a number',
    }).positive(),

    created_at: zod.date({
        invalid_type_error: 'created_at must be a date',
    }),

    update_at: zod.date({
        invalid_type_error: 'update_at must be a date',
    }),
});

export function validateSchemaCategory(input) {
    return schemaCategory.safeParse(input)
}
export function validatePartialSchemaCategory(input) {
    try {
        return schemaCategory.partial().safeParse(input)
    } catch (error) {
        return { error }
    }
}