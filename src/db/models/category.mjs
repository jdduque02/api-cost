import schemaCategory from '../schemas/category.mjs';
import { QueryErrors, ValidationError } from '../../helpers/errors.mjs';
export class ModelCategory {
    //El método `getAllCategory` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllCategory(parameters) {
        if (!parameters) throw new ValidationError('the information query parameters were not sent.');
        let findCategory;
        try {
            findCategory = await schemaCategory.find(parameters);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findCategory;
    }

    //El método `getByIdCategory` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdCategory(id) {
        if (!id) throw new ValidationError('the information query parameters were not sent.')
        let findOneCategory;
        try {
            findOneCategory = await schemaCategory.findOne(id);
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findOneCategory;
    }
    //El método `createCategory` es una función estática asincrónica que crea una nueva categoría.
    static async createCategory(input) {
        if (!input) throw new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.created_at = today;
        let newCategory;
        try {
            newCategory = await newCategory.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return newCategory;
    }
    //El método `deleteCategory` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad 'categoría'. Si no se proporciona la propiedad 'categoría', devuelve 'falso'.
    static async deleteCategory(category) {
        if (!category) throw new ValidationError('the information query parameters were not sent.');
        let { _id } = category;
        if (!_id) throw new ValidationError('the information query parameters were not sent.');
        let deletedCategory;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedCategory = await schemaCategory.deleteOne({ _id });
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //El método `updateCategory` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: 'categoría' y 'entrada'.
    static async updateCategory(category, input) {
        if (!category) throw new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.update_at = today;
        const updateCategory = Object.assign(category, input);
        let saveUpdateCategory;
        try {
            saveUpdateCategory = updateCategory.save();
        } catch (error) {
            throw new QueryErrors(`Error in the query detail: ${error}`);
        }
        return saveUpdateCategory;
    }
}