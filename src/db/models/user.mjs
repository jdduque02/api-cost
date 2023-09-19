import * as schemaUser from '../schemas.mjs';
import * as modules from '../modules.mjs';
const { bcrypt, HASH_KEY_USER, dateFns, jwt, TIMEZONE, QueryErrors, ValidationError } = modules;
export class modelUser {
    // es una función asincrónica estática que recupera todos los usuarios de la base de datos según los parámetros proporcionados.
    static async getAllUsers({ parameters }) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findUser;
        try {
            findUser = await schemaUser.find(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findUser
    }
    //es una función asincrónica que recupera un usuario de la base de datos según el `id` proporcionado.
    static async getByIdUser({ id }) {
        if (!id) throw new ValidationError('the information query parameters were not sent.');
        let findOneUser;
        try {
            findOneUser = await schemaUser.findOne(id);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findOneUser;
    }
    //La función es responsable de crear un nuevo usuario en la base de datos.
    static async createUser({ input }) {
        let salt;
        try {
            salt = await bcrypt.genSalt(15, HASH_KEY_USER);
        } catch (error) {
            return error
        }
        let hash;
        try {
            hash = await bcrypt.hash(input.password, salt);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        input.password = hash;
        let newUser;
        try {
            newUser = new schemaUser(input);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        let saveNewUser;
        try {
            saveNewUser = await newUser.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return saveNewUser;
    }
    //La función `deleteUser` es una función asíncrona estática que elimina un usuario de la base de datos según el `user` proporcionado.
    static async deleteUser({ user }) {
        if (!user) throw new ValidationError('the information query parameters were not sent.');
        let { _id } = user;
        try {
            await schemaUser.deleteOne({ _id })
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //La función `updateUser` es responsable de actualizar un usuario en la base de datos según los parámetros `user` y `input` proporcionados.
    static async updateUser({ user, input }) {
        if (!user) throw new ValidationError('the information query parameters were not sent.');
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.update_at = today;
        const updateUser = {
            ...user,
            ...input,
        };
        let saveUpdateUser;
        try {
            saveUpdateUser = await updateUser.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return saveUpdateUser;
    }
    //La función `loginUser` es responsable de autenticar a un usuario verificando su nombre de usuario y contraseña.
    static async loginUser({ input }) {
        if (!input.username | !input.password) throw new ValidationError('the information query parameters were not sent.');
        let findUser;
        try {
            findUser = await schemaUser.findOne({ username: input.userName });
        } catch (error) {
            throw new ValidationError('the information query parameters were not sent.');
        }
        if (!findUser || !findUser.state) throw new ValidationError('the information query parameters were not sent.');
        try {
            await bcrypt.compare(input.password, findUser.password)
                .catch(err => err)
                .then((search) => {
                    if (!search) throw new ValidationError('the information query parameters were not sent.');
                    let { username, role, email, numerPhone } = findUser;
                    let charge = {
                        username,
                        role,
                        email,
                        numerPhone
                    };
                    jwt.sing(charge, HASH_KEY_USER, {
                        expiresIn: 5400,
                    }, (error, token) => {
                        if (error) throw new QueryErrors(`Error in the query detail: ${error}`);
                        return token;
                    })
                });
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
    }
}
