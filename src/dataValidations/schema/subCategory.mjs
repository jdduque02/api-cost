import zod from 'zod';
//El código define un esquema para un objeto de subcategoría utilizando la biblioteca Zod.
const schemaSubCategory = zod.object({
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
    }),

    userId: zod.string({
        invalid_type_error: 'userId must be a string',
        required_error: 'userId is required',
    }),

    created_at: zod.date({
        invalid_type_error: 'created_at must be a date',
    }),

    update_at: zod.date({
        invalid_type_error: 'update_at must be a date',
    }),
});

export function validateSchemaSubCategory(input) {
    return schemaSubCategory.safeParse(input)
}
export function validateSchemaPartialSubCategory(input) {
    try {
        return schemaSubCategory.partial().safeParse(input)
    } catch (error) {
        return error
    }
}