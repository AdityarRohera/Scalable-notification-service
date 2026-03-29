

// POST /admin/clients/create

import ClientModel from "../models/ClientModel.js";
import { newClient } from "../services/clientService.js";
import { generateApiKey } from "../utils/generateKey.js";
import type { Request , Response } from "express";

export const createClient = async (req : Request, res : Response) => {
    try{
        
        const { name } = req.body;
        const apiKey = generateApiKey();

        // create client
        const client = await newClient({name , apiKey , isActive : true});

        return res.status(200).json({
            success : true,
            message: "Client created",
            client : client
        });


    } catch(err){
        console.log("Error comes in creating client -> " , err);
        return res.status(500).json({
            success : false,
            message : "Server Error",
            error : err
        })
    }
};