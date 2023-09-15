import {schemaCategory} from '../schemas.mjs';
import {TIMEZONE, dateFns} from '../modules.mjs';

export class categoryModel {
    //El método `getAllCategory` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllCategory({parameters}){
        if (!parameters) return false;
        let findCategory;
        try {
            findCategory = await schemaCategory.find(parameters);
        } catch (error) {
            return error;
        }
        return findCategory;
    }

    //El método `getByIdCategory` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdCategory({id}){
        if (!id) return false;
        let findOneCategory;
        try{
            findOneCategory = await schemaCategory.findOne(id);
        }catch(error){
            return error;
        }
        return findOneCategory;
    }
    //El método `createCategory` es una función estática asincrónica que crea una nueva categoría.
    static async createCategory({input}){
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.created_at = today;
        let newCategory;
        try{
            newCategory = await newCategory.save();
        }catch(error){
            return error;
        }
        return newCategory;
    }
    //El método `deleteCategory` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad "categoría". Si no se proporciona la propiedad "categoría", devuelve "falso".
    static async deleteCategory({category}){
        if(!category) return false;
        let {_id} = category;
        let deletedCategory;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedCategory = await schemaCategory.deleteOne({_id});
        } catch (error) {
            return error;            
        }
        return true;
    }
    //El método `updateCategory` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: "categoría" y "entrada".
    static async updateCategory({category, input}){
        if(!category) return false;
        const today = new Date();
        dateFns.setZone(today, TIMEZONE);
        input.update_at = today;
        const updateCategory = {
            ...category,
            ...input,
        };
        let saveUpdateCategory;
        try {
            saveUpdateCategory = updateCategory.save();
        } catch (error) {
            return error;
        }
        return saveUpdateCategory;
    }
}