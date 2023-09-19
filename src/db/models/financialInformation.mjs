import * as schemaFinancialInformation  from '../schemas.mjs';
import * as modules from '../modules.mjs';
const { TIMEZONE, dateFns, QueryErrors, ValidationError } = modules;

export class modelFinancialInformation {
    //El método `getAllFinancialInformation` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllFinancialInformation({ parameters }) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findFinancialInformation;
        try {
            findFinancialInformation = await schemaFinancialInformation.find(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findFinancialInformation;
    }

    //El método `getByIdFinancialInformation` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdFinancialInformation({ id }) {
        if (!id) throw new ValidationError('the information query parameters were not sent.');
        let findOneFinancialInformation;
        try {
            findOneFinancialInformation = await schemaFinancialInformation.findOne(id);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findOneFinancialInformation;
    }
    //El método `createFinancialInformation` es una función estática asincrónica que crea una nueva categoría.
    static async createFinancialInformation({ input }) {
        if (!input) throw new ValidationError('the information query parameters were not sent.');
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.created_at = today;
        let newFinancialInformation;
        try {
            newFinancialInformation = await newFinancialInformation.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return newFinancialInformation;
    }
    //El método `deleteFinancialInformation` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad 'categoría'. Si no se proporciona la propiedad 'categoría', devuelve 'falso'.
    static async deleteFinancialInformation({ financialInformation }) {
        if (!financialInformation) throw new ValidationError('the information query parameters were not sent.');
        let { _id } = financialInformation;
        if (!_id) throw new ValidationError('the information query parameters were not sent.');
        let deletedFinancialInformation;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedFinancialInformation = await schemaFinancialInformation.deleteOne({ _id });
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //El método `updateFinancialInformation` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: 'categoría' y 'entrada'.
    static async updateFinancialInformation({ financialInformation, input }) {
        if (!financialInformation) throw new ValidationError('the information query parameters were not sent.');
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.update_at = today;
        const updateFinancialInformation = {
            ...financialInformation,
            ...input,
        };
        let saveUpdateFinancialInformation;
        try {
            saveUpdateFinancialInformation = updateFinancialInformation.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return saveUpdateFinancialInformation;
    }
}