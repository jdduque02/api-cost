import * as mdCategory from './models/category.mjs';
const { modelCategory } = mdCategory;
import * as mdFinancialInformation from './models/financialInformation.mjs';
const { modelFinancialInformation } = mdFinancialInformation;
import * as mdSubCategory from './models/subCategory.mjs';
const { modelSubCategory } = mdSubCategory;
import * as mdUser from './models/user.mjs';
const { modelUser } = mdUser;
import * as mdTransaction from './models/transaction.mjs';
const { modelTransaction } = mdTransaction;

export default {
    modelCategory,
    modelFinancialInformation,
    modelSubCategory,
    modelUser,
    modelTransaction
}
