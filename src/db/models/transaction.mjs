import schemaTransaction from '../schemas/transaction.mjs';
import { QueryErrors, ValidationError } from '../../helpers/errors.mjs';

export class ModelTransaction {
    //El método `getAllTransaction` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllTransaction(parameters) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findTransaction;
        try {
            findTransaction = await schemaTransaction.find(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findTransaction;
    }

    //El método `getByIdTransaction` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdTransaction(parameters) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findOneTransaction;
        try {
            findOneTransaction = await schemaTransaction.findOne(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findOneTransaction;
    }
    //El método `createTransaction` es una función estática asincrónica que crea una nueva categoría.
    static async createTransaction(input) {
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.created_at = today;
        let newTransaction;
        try {
            newTransaction = await newTransaction.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return newTransaction;
    }
    //El método `deleteTransaction` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad 'categoría'. Si no se proporciona la propiedad 'categoría', devuelve 'falso'.
    static async deleteTransaction(transaction) {
        if (!transaction) throw new ValidationError('the information query parameters were not sent.');
        let { _id } = transaction;
        let deletedTransaction;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedTransaction = await schemaTransaction.deleteOne({ _id });
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //El método `updateTransaction` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: 'categoría' y 'entrada'.
    static async updateTransaction(transaction, input) {
        if (!transaction) throw new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.update_at = today;
        const updateTransaction = Object.assign(transaction, input);
        let saveUpdateTransaction;
        try {
            saveUpdateTransaction = updateTransaction.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return saveUpdateTransaction;
    }
}