import {schemaSubCategory} from '../schemas.mjs';
import {TIMEZONE, dateFns} from '../modules.mjs';

export class subCategoryModel {
    //El método `getAllSubCategory` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllSubCategory({parameters}){
        if (!parameters) return false;
        let findSubCategory;
        try {
            findSubCategory = await schemaSubCategory.find(parameters);
        } catch (error) {
            return error;
        }
        return findSubCategory;
    }

    //El método `getByIdSubCategory` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdSubCategory({id}){
        if (!id) return false;
        let findOneSubCategory;
        try{
            findOneSubCategory = await schemaSubCategory.findOne(id);
        }catch(error){
            return error;
        }
        return findOneSubCategory;
    }
    //El método `createSubCategory` es una función estática asincrónica que crea una nueva categoría.
    static async createSubCategory({input}){
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.created_at = today;
        let newSubCategory;
        try{
            newSubCategory = await newSubCategory.save();
        }catch(error){
            return error;
        }
        return newSubCategory;
    }
    //El método `deleteSubCategory` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad "categoría". Si no se proporciona la propiedad "categoría", devuelve "falso".
    static async deleteSubCategory({subCategory}){
        if(!subCategory) return false;
        let {_id} = subCategory;
        let deletedSubCategory;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedSubCategory = await schemaSubCategory.deleteOne({_id});
        } catch (error) {
            return error;            
        }
        return true;
    }
    //El método `updateSubCategory` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: "categoría" y "entrada".
    static async updateSubCategory({subCategory, input}){
        if(!subCategory) return false;
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.update_at = today;
        const updateSubCategory = {
            ...subCategory,
            ...input,
        };
        let saveUpdateSubCategory;
        try {
            saveUpdateSubCategory = updateSubCategory.save();
        } catch (error) {
            return error;
        }
        return saveUpdateSubCategory;
    }
}