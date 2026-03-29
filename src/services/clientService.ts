

import ClientModel from "../models/ClientModel.js"

export const newClient = async({name , apiKey , isActive} : any) => {
    return await ClientModel.create({name , apiKey , isActive});
}