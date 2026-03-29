

// Implement NOtification queue   # Queue setup (BullMQ)

import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import NotifyModel from '../models/NotifyModel.js';


const notificationQueue = new Queue('notification-queue', {
  connection: redisConnection,
});


export async function addNotificationJob({clientId , userId , recipient , type , message , channel , metaData} : any){

    try{

        // first create notification
        const notification = await NotifyModel.create(
            {
                client : clientId,
                externalUserId : userId,
                recipient : recipient,
                type,
                message,
                channel,
                status : 'QUEUED',
                metaData : metaData,

            }
        )


        // Add Job To Queue
        const job = await notificationQueue.add(
            "send-notification",
            {
                notificationId: notification._id,
                client : notification.client,
                externalUserId : notification.externalUserId,
                recipient : notification.recipient,
                channel : notification.channel,
                message : notification.message,
                metaData : notification.metaData,
                type : notification.type,
                status : notification.status
            },
            {
                attempts : 3,
                backoff : {
                    type : 'exponential',
                    delay : 5000
                }
            }
        )


        // Update job
        notification.jobId = job.id!;
        await notification.save();
        

        console.log(`📩 Job added: ${job.name} (ID: ${job.id})`);
        return {
            success: true,
            jobId: job.id,
            notificationId: notification._id,
            status: "QUEUED",
            queue: job.queueName
        };            

    } catch(err){
        console.log("Error comes in Adding notification to queue" , err)
        throw err;
    }

}
