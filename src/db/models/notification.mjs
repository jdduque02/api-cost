import schemaNotification from '../schemas/notification.mjs';
import { QueryErrors, ValidationError } from '../../helpers/errors.mjs';
export class ModelNotification {
    //El método `getAllNotification` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllNotification(parameters) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findNotification;
        try {
            findNotification = await schemaNotification.find(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findNotification;
    }

    //El método `getByIdNotification` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdNotification(parameters) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findOneNotification;
        try {
            findOneNotification = await schemaNotification.findOne(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findOneNotification;
    }
    //El método `createNotification` es una función estática asincrónica que crea una nueva categoría.
    static async createNotification(input) {
        if (!input) throw new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.created_at = today;
        let newNotificacion;
        try {
            newNotificacion = new schemaNotification(input);
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        let savenewNotificacion;
        try {
            savenewNotificacion = await newNotificacion.save();
        } catch (error) {
            console.log(`Error in the query detail save category: ${error}`)
            return error
        }
        return savenewNotificacion;
    }
    //El método `deleteNotification` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad 'categoría'. Si no se proporciona la propiedad 'categoría', devuelve 'falso'.
    static async deleteNotification(subCategory) {
        if (!subCategory) throw new ValidationError('the information query parameters were not sent.');
        let { _id } = subCategory;
        let deletedNotification;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedNotification = await schemaNotification.deleteOne(_id);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //El método `updateNotification` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: 'categoría' y 'entrada'.
    static async updateNotification(subCategory, input) {
        if (!subCategory) throw new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.update_at = today;
        const updateNotification = Object.assign(subCategory, input);
        let saveUpdateNotification;
        try {
            saveUpdateNotification = updateNotification.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return saveUpdateNotification;
    }
}