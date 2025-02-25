import zod from 'zod';

const schemaNotification = zod.object({
    title: zod.string({
        invalid_type_error: 'title must be a string',
        required_error: 'title is required',
    }),
    description: zod.string({
        invalid_type_error: 'description must be a string',
        required_error: 'description is required',
    }),
    userId: zod.string({
        invalid_type_error: 'userId must be a string',
        required_error: 'userId is required',
    }).uuid({ message: 'must be an id of a user' }),
    created_at: zod.date({
        invalid_type_error: 'created_at must be a date',
    }),
    value: zod.number({
        invalid_type_error: 'value must be a number',
    }).positive(),
    completed: zod.boolean({
        invalid_type_error: 'completed must be a boolean',
    }),
    remember: zod.boolean({
        invalid_type_error: 'remember must be a boolean',
    }).default(false),
    update_at: zod.date({
        invalid_type_error: 'update_at must be a date',
    }),
});

/**
 * Validate a full notification object against the schema.
 * @param {object} input - A notification object.
 * @returns {object} - An object with a `success` property which is a boolean indicating whether the input is valid, and an `error` property which is an error object if the input is invalid.
 */
export function validateSchemaNotification(input) {
    return schemaNotification.safeParse(input)
}
/**
 * Validate a partial notification object against the schema.
 * @param {object} input - A partial notification object.
 * @returns {object} - An object with a `success` property which is a boolean indicating whether the input is valid, and an `error` property which is an error object if the input is invalid.
 */
export function validatePartialSchemaNotification(input) {
    try {
        return schemaNotification.partial().safeParse(input)
    } catch (error) {
        return { error }
    }
}