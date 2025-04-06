import schemaSubCategory from '../schemas/subCategory.mjs';
import { QueryErrors, ValidationError } from '../../helpers/errors.mjs';
export class ModelSubCategory {
    //El método `getAllSubCategory` es una función asincrónica estática que recupera todas las categorías según los parámetros proporcionados.
    static async getAllSubCategory(parameters) {
        if (!parameters) return new ValidationError('the information query parameters were not sent.');
        let findSubCategory;
        try {
            findSubCategory = await schemaSubCategory.find(parameters);
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findSubCategory;
    }

    //El método `getByIdSubCategory` es una función asincrónica estática que recupera una categoría por su ID.
    static async getByIdSubCategory(parameters) {
        if (!parameters) return new ValidationError('the information query parameters were not sent.');
        let findOneSubCategory;
        try {
            findOneSubCategory = await schemaSubCategory.findOne(parameters);
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        return findOneSubCategory;
    }
    //El método `createSubCategory` es una función estática asincrónica que crea una nueva categoría.
    static async createSubCategory(input) {
        if (!input) return new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.created_at = today;
        let newSubCategory;
        try {
            newSubCategory = new schemaSubCategory(input);
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        let saveSubCategory;
        try {
            saveSubCategory = await newSubCategory.save();
        } catch (error) {
            return new QueryErrors(`Error in the query detail save category: ${error}`);
        }
        return saveSubCategory;
    }
    //El método `deleteSubCategory` es una función asíncrona estática que elimina una categoría de la base de datos. Toma un objeto como parámetro, que debe contener la propiedad 'categoría'. Si no se proporciona la propiedad 'categoría', devuelve 'falso'.
    static async deleteSubCategory(searchParams) {
        if (!searchParams) return new ValidationError('the information query parameters were not sent.');
        let deletedSubCategory;
        try {
            // eslint-disable-next-line no-unused-vars
            deletedSubCategory = await schemaSubCategory.deleteOne(searchParams);
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        return true;
    }
    //El método `updateSubCategory` es una función asíncrona estática que actualiza una categoría en la base de datos. Se necesitan dos parámetros: 'categoría' y 'entrada'.
    static async updateSubCategory(subCategory, input) {
        if (!subCategory) return new ValidationError('the information query parameters were not sent.');
        let today = new Date();
        today.setUTCHours(today.getUTCHours() - 5);
        input.update_at = today;
        const updateSubCategory = Object.assign(subCategory, input);
        let saveUpdateSubCategory;
        try {
            saveUpdateSubCategory = updateSubCategory.save();
        } catch (error) {
            return new QueryErrors(`Error in the query detail: ${error}`);
        }
        return saveUpdateSubCategory;
    }
}