import {schemaTransaction} from '../schemas.mjs';
import {TIMEZONE, dateFns} from '../modules.mjs';

export class transactionModel {
    //El método `getAllTransaction` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllTransaction({parameters}){
        if (!parameters) return false;
        let findTransaction;
        try {
            findTransaction = await schemaTransaction.find(parameters);
        } catch (error) {
            return error;
        }
        return findTransaction;
    }

    //El método `getByIdTransaction` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdTransaction({id}){
        if (!id) return false;
        let findOneTransaction;
        try{
            findOneTransaction = await schemaTransaction.findOne(id);
        }catch(error){
            return error;
        }
        return findOneTransaction;
    }
    //El método `createTransaction` es una función estática asincrónica que crea una nueva categoría.
    static async createTransaction({input}){
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.created_at = today;
        let newTransaction;
        try{
            newTransaction = await newTransaction.save();
        }catch(error){
            return error;
        }
        return newTransaction;
    }
    //El método `deleteTransaction` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad "categoría". Si no se proporciona la propiedad "categoría", devuelve "falso".
    static async deleteTransaction({transaction}){
        if(!transaction) return false;
        let {_id} = transaction;
        let deletedTransaction;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedTransaction = await schemaTransaction.deleteOne({_id});
        } catch (error) {
            return error;            
        }
        return true;
    }
    //El método `updateTransaction` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: "categoría" y "entrada".
    static async updateTransaction({transaction, input}){
        if(!transaction) return false;
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.update_at = today;
        const updateTransaction = {
            ...transaction,
            ...input,
        };
        let saveUpdateTransaction;
        try {
            saveUpdateTransaction = updateTransaction.save();
        } catch (error) {
            return error;
        }
        return saveUpdateTransaction;
    }
}