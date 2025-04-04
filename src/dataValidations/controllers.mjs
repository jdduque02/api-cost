import { validateSchemaCategory, validatePartialSchemaCategory } from './schema/category.mjs';
import { validateSchemaFinancialInformation, validateSchemaPartialFinancialInformation } from './schema/financialInformation.mjs';
import { validateSchemaFinancialObjective, validateSchemaPartialFinancialObjective } from './schema/financialObjective.mjs';
import { validateSchemaSubCategory, validateSchemaPartialSubCategory } from './schema/subCategory.mjs';
import { validateSchemaTransaction, validateSchemaPartialTransaction } from './schema/transaction.mjs';
import { validateSchemaNotification, validateSchemaPartialNotification } from './schema/notification.mjs';

export default {
    validateSchemaCategory,
    validatePartialSchemaCategory,
    validateSchemaFinancialInformation,
    validateSchemaPartialFinancialInformation,
    validateSchemaFinancialObjective,
    validateSchemaPartialFinancialObjective,
    validateSchemaSubCategory,
    validateSchemaPartialSubCategory,
    validateSchemaTransaction,
    validateSchemaPartialTransaction,
    validateSchemaNotification,
    validateSchemaPartialNotification
    /* validateSchemaUser,
    validateSchemaPartialUser, */
}