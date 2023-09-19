import zod from 'zod';
//El código define un esquema para el objeto `changeHistoryUser` usando la biblioteca Zod. El esquema especifica la estructura y las reglas de validación para el objeto `changeHistoryUser`.
const changeHistoryUser = zod.object({
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

//El código define un esquema de usuario utilizando la biblioteca Zod. El esquema de usuario especifica la estructura y las reglas de validación para un objeto de usuario.
const schemaUser = zod.object({
    username: zod.string({
        invalid_type_error: 'username must be a string',
        required_error: 'username is required',
    }).min(5, { message: 'must have 5 minimums' }),

    password: zod.string({
        invalid_type_error: 'password must be a string',
        required_error: 'password is required',
    }).min(8, { message: 'Must have 8 minimums' }),

    email: zod.string({
        invalid_type_error: 'email must be a string',
        required_error: 'email is required',
    }).toLowerCase().email(),

    numerPhone: zod.number({
        invalid_type_error: 'numerPhone must be a number',
    }).positive(),

    role: zod.number({
        invalid_type_error: 'role must be a number',
    }).positive(),

    imgProfile: zod.string({
        invalid_type_error: 'imgProfile must be a string',
    }).url({
        message: 'Invalid url'
    }),

    changeHistoryUser,

    created_at: zod.date({
        invalid_type_error: 'created_at must be a date',
    }),

    update_at: zod.date({
        invalid_type_error: 'update_at must be a date',
    }),

    state: zod.boolean({
        invalid_type_error: 'state must be a boolean',
        required_error: 'state is required',
    }),

    last_conect: zod.date({
        invalid_type_error: 'last_conect must be a date'
    }),
})
export function validateSchemaUser(input) {
    return schemaUser.safeParse(input)
}
export function validateSchemaPartialUser(input) {
    try {
        return schemaUser.partial().safeParse(input)
    } catch (error) {
        return { error }
    }
}