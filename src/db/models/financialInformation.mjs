import {schemaFinancialInformation} from '../schemas.mjs';
import {TIMEZONE, dateFns} from '../modules.mjs';

export class financialInformationModel {
    //El método `getAllFinancialInformation` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllFinancialInformation({parameters}){
        if (!parameters) return false;
        let findFinancialInformation;
        try {
            findFinancialInformation = await schemaFinancialInformation.find(parameters);
        } catch (error) {
            return error;
        }
        return findFinancialInformation;
    }

    //El método `getByIdFinancialInformation` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdFinancialInformation({id}){
        if (!id) return false;
        let findOneFinancialInformation;
        try{
            findOneFinancialInformation = await schemaFinancialInformation.findOne(id);
        }catch(error){
            return error;
        }
        return findOneFinancialInformation;
    }
    //El método `createFinancialInformation` es una función estática asincrónica que crea una nueva categoría.
    static async createFinancialInformation({input}){
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.created_at = today;
        let newFinancialInformation;
        try{
            newFinancialInformation = await newFinancialInformation.save();
        }catch(error){
            return error;
        }
        return newFinancialInformation;
    }
    //El método `deleteFinancialInformation` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad "categoría". Si no se proporciona la propiedad "categoría", devuelve "falso".
    static async deleteFinancialInformation({financialInformation}){
        if(!financialInformation) return false;
        let {_id} = financialInformation;
        let deletedFinancialInformation;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedFinancialInformation = await schemaFinancialInformation.deleteOne({_id});
        } catch (error) {
            return error;            
        }
        return true;
    }
    //El método `updateFinancialInformation` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: "categoría" y "entrada".
    static async updateFinancialInformation({financialInformation, input}){
        if(!financialInformation) return false;
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
            return error;
        }
        return saveUpdateFinancialInformation;
    }
}