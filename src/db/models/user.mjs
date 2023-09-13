import User from '../schemas/user'
import { bcrypt, HASH_KEY_USER, dateFns, jwt, TIMEZONE } from '../modules.mjs'
export class userModel {
    // es una función asincrónica estática que recupera todos los usuarios de la base de datos según los parámetros proporcionados.
    static async getAllUsers({ parameters }) {
        if (!parameters) return false;
        let usersDBFind;
        try {
            usersDBFind = await User.find(parameters);
        } catch (error) {
            throw new Error(error.message);
        }
        return usersDBFind
    }
    //es una función asincrónica que recupera un usuario de la base de datos según el `id` proporcionado.
    static async getByIdUser({ id }) {
        if (!id) return false;
        let usersDBFindOne;
        try {
            usersDBFindOne = await User.findOne(id);
        } catch (error) {
            return error;
        }
        return usersDBFindOne;
    }
    //La función es responsable de crear un nuevo usuario en la base de datos.
    static async createUser(body) {
        let salt;
        try {
            salt = await bcrypt.genSalt(15, HASH_KEY_USER);
        } catch (error) {
            return error
        }
        let hash;
        try {
            hash = await bcrypt.hash(body.password, salt);
        } catch (error) {
            return error;
        }
        body.password = hash;
        let newUser;
        try {
            newUser = new User(body);
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
    //La función `deleteUser` es una función asíncrona estática que elimina un usuario de la base de datos según el `userDB` proporcionado.
    static async deleteUser({ userDB }) {
        if (!userDB) return false;
        let userId = userDB._id;
        let userDBDelete;
        try {
            // eslint-disable-next-line no-unused-vars
            userDBDelete = await User.deleteOne({ _id: userId })
        } catch (error) {
            return error;
        }
        return true;
    }
    //La función `updateUser` es responsable de actualizar un usuario en la base de datos según los parámetros `userDB` y `input` proporcionados.
    static async updateUser({ userDB, input }) {
        if (!userDB) return false;
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.update_at = today;
        const updateUser = {
            ...userDB,
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
        let userFindDB;
        try {
            userFindDB = await User.findOne({ username: input.userName });
        } catch (error) {
            return false;
        }
        if (!userFindDB || !userFindDB.state) return false;
        try {
            await bcrypt.compare(input.password, userFindDB.password)
                .catch(err => err)
                .then((search) => {
                    if (!search) return false;
                    let { username, role, email, numerPhone } = userFindDB;
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
