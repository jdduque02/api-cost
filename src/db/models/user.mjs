import schemaUser from '../schemas/user.mjs';
import bcrypt from 'bcrypt';
import { QueryErrors, ValidationError, ResourceNotFoundError } from '../../helpers/errors.mjs';


const { HASH_KEY_USER } = process.env;
//El código anterior define una clase llamada "ModelUser" que contiene varios métodos estáticos para interactuar con un modelo de usuario en una base de datos.
export class ModelUser {
    // es una función asincrónica estática que recupera todos los usuarios de la base de datos según los parámetros proporcionados.
    static async getUser(parameters) {
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
    static async getOneUser(parameters) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findOneUser;
        try {
            findOneUser = await schemaUser.findOne(parameters);
            ///findOneUser = findOneUser.projection(projection);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        if (findOneUser === null) throw new ResourceNotFoundError('not found user.');
        return findOneUser;
    }
    //La función es responsable de crear un nuevo usuario en la base de datos.
    static async createUser(input) {
        let salt;
        try {
            salt = bcrypt.genSaltSync(15);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail generate salt: ${error}`);
        }
        let hash;
        try {
            hash = bcrypt.hashSync(input.password, salt, 15, HASH_KEY_USER);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail create hash: ${error}`);
        }
        input.password = hash;
        let newUser;
        try {
            newUser = new schemaUser(input);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail schema user: ${error}`);
        }
        let saveNewUser;
        try {
            saveNewUser = await newUser.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail save user: ${error}`);
        }
        return saveNewUser;
    }
    //La función `deleteUser` es una función asíncrona estática que elimina un usuario de la base de datos según el `user` proporcionado.
    static async deleteUser(username) {
        if (!username) throw new ValidationError('the information query parameters were not sent.');
        try {
            await schemaUser.deleteOne({ username })
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //La función `updateUser` es responsable de actualizar un usuario en la base de datos según los parámetros `user` y `input` proporcionados.
    static async updateUser(user, input) {
        if (!user) throw new ValidationError('the information query parameters were not sent.');
        if (input.password) {
            let salt;
            try {
                salt = bcrypt.genSaltSync(15);
            } catch (error) {
                throw new QueryErrors(`Error in the query detail generate salt: ${error}`);
            }
            let hash;
            try {
                hash = bcrypt.hashSync(input.password, salt, 15, HASH_KEY_USER);
            } catch (error) {
                throw new QueryErrors(`Error in the query detail create hash: ${error}`);
            }
            input.password = hash;
        }
        const updateUser = Object.assign(user, input);
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        updateUser.update_at = today;
        let saveUpdateUser;
        try {
            saveUpdateUser = await updateUser.save();
        } catch (error) {
            throw new QueryErrors(error, `Error in the query detail: ${error}`);
        }
        if (input.changeData) {
            let { changeData } = input;
            let updateChangeHisory;
            const update = {
                $push: {
                    changeHistoryUser: changeData,
                },
            };
            try {
                updateChangeHisory = await schemaUser.updateOne({ _id: saveUpdateUser._id }, update).populate('changeHistoryUser');
            } catch (error) {
                throw new QueryErrors(error, `Error in update change history: ${error}`);
            }
            return [updateChangeHisory, saveUpdateUser._id];
        }
        return saveUpdateUser;
    }
}

//La clase `ModelHistoryChangeUser` es responsable de interactuar con el historial de cambios de un usuario en la base de datos. Contiene tres métodos asincrónicos estáticos:
export class ModelHistoryChangeUser {
    //La función `createChangeHistoryUser` es responsable de crear un nuevo historial de cambios para un usuario en la base de datos. Se necesita un parámetro de "entrada" que contiene la información necesaria para crear el historial de cambios.
    static async createChangeHistoryUser({ input }) {
        if (!input) throw new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.dateModification = today;
        const newChange = {
            $set: {
                changeHistoryUser: [input.change],
            },
        };
        let newChangeHistoryUser;
        try {
            newChangeHistoryUser = await schemaUser.updateOne({ _id: input._id }, newChange, { populate: { changeHistoryUser: true } });
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return newChangeHistoryUser;
    }
    //La función `getAllChangeUsers` es una función asincrónica estática que recupera todos los usuarios de la base de datos junto con su historial de cambios. Toma un objeto "parámetros" como parámetro, que se utiliza para filtrar a los usuarios, si se proporciona.
    static async getAllChangeUsers({ parameters }) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findUser;
        try {
            findUser = await schemaUser.find({ populate: { changeHistoryUser: true } });
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findUser;
    }
    //La función `getAllChangeUser` es una función asincrónica estática que recupera un usuario de la base de datos junto con su historial de cambios. Toma un objeto `parámetros` como parámetro, que se utiliza para filtrar al usuario según su `_id`.
    static async getAllChangeUser({ parameters }) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findUser;
        try {
            findUser = await schemaUser.find({ _id: parameters._id }, { populate: { changeHistoryUser: true } });
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findUser
    }
}