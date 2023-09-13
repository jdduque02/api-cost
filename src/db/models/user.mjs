import User from '../schemas/user'
import { bcrypt, HASH_KEY_USER, dateFns, jwt, TIMEZONE } from '../modules.mjs'
export class userModel {
    // es una función asincrónica estática que recupera todos los usuarios de la base de datos según los parámetros proporcionados.
    static async getAllUsers({ parameters }) {
        if (!parameters) return false;
        let findUser;
        try {
            findUser = await User.find(parameters);
        } catch (error) {
            throw new Error(error.message);
        }
        return findUser
    }
    //es una función asincrónica que recupera un usuario de la base de datos según el `id` proporcionado.
    static async getByIdUser({ id }) {
        if (!id) return false;
        let findOneUser;
        try {
            findOneUser = await User.findOne(id);
        } catch (error) {
            return error;
        }
        return findOneUser;
    }
    //La función es responsable de crear un nuevo usuario en la base de datos.
    static async createUser({input}) {
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
            return error;
        }
        input.password = hash;
        let newUser;
        try {
            newUser = new User(input);
        } catch (error) {
            return error;
        }
        let saveNewUser;
        try {
            saveNewUser = await newUser.save();
        } catch (error) {
            return error;
        }
        return saveNewUser;
    }
    //La función `deleteUser` es una función asíncrona estática que elimina un usuario de la base de datos según el `user` proporcionado.
    static async deleteUser({ user }) {
        if (!user) return false;
        let {_id} = user;
        let userDelete;
        try {
            // eslint-disable-next-line no-unused-vars
            userDelete = await User.deleteOne({ _id })
        } catch (error) {
            return error;
        }
        return true;
    }
    //La función `updateUser` es responsable de actualizar un usuario en la base de datos según los parámetros `user` y `input` proporcionados.
    static async updateUser({ user, input }) {
        if (!user) return false;
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
            return error;
        }
        return saveUpdateUser;
    }
    //La función `loginUser` es responsable de autenticar a un usuario verificando su nombre de usuario y contraseña.
    static async loginUser({ input }) {
        if (!input.username | !input.password) return false;
        let findUser;
        try {
            findUser = await User.findOne({ username: input.userName });
        } catch (error) {
            return false;
        }
        if (!findUser || !findUser.state) return false;
        try {
            await bcrypt.compare(input.password, findUser.password)
                .catch(err => err)
                .then((search) => {
                    if (!search) return false;
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
                        if (error) return error;
                        return token;
                    })
                });
        } catch (error) {
            return error;
        }
    }
}
