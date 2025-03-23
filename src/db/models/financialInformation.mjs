import schemaFinancialInformation from '../schemas/financialInformation.mjs';
import { QueryErrors, ValidationError } from '../../helpers/errors.mjs';

export class ModelFinancialInformation {
    //El método `getAllFinancialInformation` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllFinancialInformation(parameters) {
        if (!parameters) return new ValidationError('the information query parameters were not sent.');
        let findFinancialInformation;
        try {
            findFinancialInformation = await schemaFinancialInformation.find(parameters);
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findFinancialInformation;
    }

    //El método `getByIdFinancialInformation` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdFinancialInformation(parameters) {
        if (!parameters) return new ValidationError('the information query parameters were not sent.');
        let findOneFinancialInformation;
        try {
            findOneFinancialInformation = await schemaFinancialInformation.findOne(parameters);
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findOneFinancialInformation;
    }
    //El método `createFinancialInformation` es una función estática asincrónica que crea una nueva categoría.
    static async createFinancialInformation(input) {
        if (!input) return new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.created_at = today;
        let newFinancialInformation;
        try {
            newFinancialInformation = new schemaFinancialInformation(input);
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        let saveNewFinancialInformation;
        try {
            saveNewFinancialInformation = await newFinancialInformation.save();
        } catch (error) {
            console.log(`Error in the query detail save financial Information: ${error}`)
            return error
        }
        return saveNewFinancialInformation;
    }
    //El método `deleteFinancialInformation` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad 'categoría'. Si no se proporciona la propiedad 'categoría', devuelve 'falso'.
    static async deleteFinancialInformation(financialInformation) {
        if (!financialInformation) return new ValidationError('the information query parameters were not sent.');
        const { _id } = financialInformation;
        if (!_id) return new ValidationError('the information query parameters were not sent.');
        let deletedFinancialInformation;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedFinancialInformation = await schemaFinancialInformation.deleteOne({ _id });
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //El método `updateFinancialInformation` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: 'categoría' y 'entrada'.
    static async updateFinancialInformation(financialInformation, input) {
        if (!financialInformation) return new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.update_at = today;
        const updateFinancialInformation = Object.assign(financialInformation, input);
        let saveUpdateFinancialInformation;
        try {
            saveUpdateFinancialInformation = updateFinancialInformation.save();
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        return saveUpdateFinancialInformation;
    }
}