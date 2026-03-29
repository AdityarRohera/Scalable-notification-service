
import type { Request , Response } from "express";
import mongoose from "mongoose";
const secret = process.env.TOKEN_SECRET;
import jwt from 'jsonwebtoken';
import type {JwtPayload } from 'jsonwebtoken'
import { getUser } from "../services/userService.js";
import ClientModel from "../models/ClientModel.js";

export interface AuthenticatedRequest extends Request {
        user : JwtPayload;
        client : any;
}

export const userAuth = (req : Request , res : Response , next : Function) => {
        try{

            const userReq = req as AuthenticatedRequest;
            const {token} = req.headers;
            console.log("Inside user auth -> " , token , typeof(token))

            if(!token || typeof token!== "string"){
                res.status(400).send({
                    success : false,
                    message : "Token Required"
                })
                return;
            }

            // now verify token
            const verifyToken =  jwt.verify(token , secret!) as JwtPayload
            // console.log(verifyToken , "Inside auth -> verifyToken");

            if(!verifyToken){
            res.status(403).send({
                success : false,
                message: "Token invalid"
            })
            return;
            }

            userReq.user = verifyToken;

            next();

        }catch(err : unknown){
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in user auth",
                error : errorMessage
            })
        }
   }

export const authMiddleware = async (req : Request, res : Response , next : Function) => {

  const clientReq = req as AuthenticatedRequest
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "API key required" });
  }

  const client = await ClientModel.findOne({ apiKey, isActive: true});

  if (!client) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  clientReq.client = client; // attach client info

  next();
};