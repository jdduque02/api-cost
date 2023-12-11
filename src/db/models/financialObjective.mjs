import * as schemaFinancialObjective from '../schemas.mjs';
import { QueryErrors, ValidationError } from '../../helpers/errors.mjs';
export class ModelFinancialObjective {
    //El método `getAllFinancialObjective` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllFinancialObjective(parameters) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findFinancialObjective;
        try {
            findFinancialObjective = await schemaFinancialObjective.find(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findFinancialObjective;
    }

    //El método `getByIdFinancialObjective` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdFinancialObjective(parameters) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findOneFinancialObjective;
        try {
            findOneFinancialObjective = await schemaFinancialObjective.findOne(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findOneFinancialObjective;
    }
    //El método `createFinancialObjective` es una función estática asincrónica que crea una nueva categoría.
    static async createFinancialObjective(input) {
        if (!input) throw new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.created_at = today;
        let newFinancialObjective;
        try {
            newFinancialObjective = await newFinancialObjective.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return newFinancialObjective;
    }
    //El método `deleteFinancialObjective` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad 'categoría'. Si no se proporciona la propiedad 'categoría', devuelve 'falso'.
    static async deleteFinancialObjective(financialObjective) {
        if (!financialObjective) throw new ValidationError('the information query parameters were not sent.');
        let { _id } = financialObjective;
        if (!_id) throw new ValidationError('the information query parameters were not sent.');
        let deletedFinancialObjective;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedFinancialObjective = await schemaFinancialObjective.deleteOne({ _id });
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //El método `updateFinancialObjective` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: 'categoría' y 'entrada'.
    static async updateFinancialObjective(financialObjective, input) {
        if (!financialObjective) throw new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.update_at = today;
        const updateFinancialObjective = Object.assign(financialObjective, input);
        //payments
        let saveUpdateFinancialObjective;
        try {
            saveUpdateFinancialObjective = updateFinancialObjective.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        if (input.payments) {
            let { payments } = input;
            let updatePayment;
            const update = {
                $push: {
                    changeHistoryUser: payments,
                },
            };
            try {
                updatePayment = await schemaFinancialObjective.updateOne({ _id: saveUpdateFinancialObjective._id }, update).populate('payments');
            } catch (error) {
                throw new QueryErrors(error, `Error in update payments: ${error}`);
            }
            return [updatePayment, saveUpdateFinancialObjective._id];
        }
        return saveUpdateFinancialObjective;
    }
}