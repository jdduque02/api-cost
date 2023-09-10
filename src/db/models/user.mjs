import userSchema from '../schemas/user'
export class userModel {
    static async getAllUsers({ parameters }) {
        let usersDBFind;
        try {
            usersDBFind = await userSchema.find(parameters);
        } catch (error) {
            throw new Error(error.message);
        }
        return usersDBFind
    }
}