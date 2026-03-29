import UserModel from "../models/UserModel.js"


export const getUser = async(userId : any) => {
    return await UserModel.findById(userId);
}