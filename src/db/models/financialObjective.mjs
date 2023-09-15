import {schemaFinancialObjective} from '../schemas.mjs';
import {TIMEZONE, dateFns} from '../modules.mjs';

export class financialObjectiveModel {
    //El método `getAllFinancialObjective` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllFinancialObjective({parameters}){
        if (!parameters) return false;
        let findFinancialObjective;
        try {
            findFinancialObjective = await schemaFinancialObjective.find(parameters);
        } catch (error) {
            return error;
        }
        return findFinancialObjective;
    }

    //El método `getByIdFinancialObjective` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdFinancialObjective({id}){
        if (!id) return false;
        let findOneFinancialObjective;
        try{
            findOneFinancialObjective = await schemaFinancialObjective.findOne(id);
        }catch(error){
            return error;
        }
        return findOneFinancialObjective;
    }
    //El método `createFinancialObjective` es una función estática asincrónica que crea una nueva categoría.
    static async createFinancialObjective({input}){
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.created_at = today;
        let newFinancialObjective;
        try{
            newFinancialObjective = await newFinancialObjective.save();
        }catch(error){
            return error;
        }
        return newFinancialObjective;
    }
    //El método `deleteFinancialObjective` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad "categoría". Si no se proporciona la propiedad "categoría", devuelve "falso".
    static async deleteFinancialObjective({financialObjective}){
        if(!financialObjective) return false;
        let {_id} = financialObjective;
        let deletedFinancialObjective;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedFinancialObjective = await schemaFinancialObjective.deleteOne({_id});
        } catch (error) {
            return error;            
        }
        return true;
    }
    //El método `updateFinancialObjective` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: "categoría" y "entrada".
    static async updateFinancialObjective({financialObjective, input}){
        if(!financialObjective) return false;
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.update_at = today;
        const updateFinancialObjective = {
            ...financialObjective,
            ...input,
        };
        let saveUpdateFinancialObjective;
        try {
            saveUpdateFinancialObjective = updateFinancialObjective.save();
        } catch (error) {
            return error;
        }
        return saveUpdateFinancialObjective;
    }
}