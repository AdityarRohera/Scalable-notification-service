import type { Request , Response } from "express";
import { addNotificationJob } from "../queues/notification.queue.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

export const createNotificationHandler = async(req : Request , res : Response) => {
    try{

        const {recipient , type , message , channel , metaData , userId} = req.body;
        const AuthRequest = req as AuthenticatedRequest
        const {clientId}  = AuthRequest.client

       /* Validation */
        if(!recipient || !type || !message || !channel){
            return res.status(400).json({
            success:false,
            message:"Missing required fields"
            });
        }

        // add notification to queue
        await addNotificationJob(
            {   
                clientId,
                userId,
                recipient,
                type,
                message,
                channel,
                metaData
            }
        )

        return res.status(200).json({
            success : true,
            message : "Notification queued successfully"
        })

    } catch(err : unknown){
        console.log("Failed to queue notification" , err);
        let errmessage;

        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        } else{
            errmessage = err;
        }

        return res.status(500).json({
            success:false,
            message: "Server Error",
            error : errmessage
        });
    }
}