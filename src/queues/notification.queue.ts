

// Implement NOtification queue   # Queue setup (BullMQ)

import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

// ✅ Strong typing
// type NotificationJobData = {
//   userId: string;
//   message?: string;
//   channel: 'email' | 'sms' | 'push';
//   metaData?: Record<string, any>;
// };

// ✅ Better queue name + connection

const notificationQueue = new Queue('notification-queue', {
  connection: redisConnection,
});


export async function addNotificationJob({userId , channel , message , metaData , type} : any){

    try{

        const job = await notificationQueue.add(
            channel,
            {
            userId,
            channel : channel,
            message : message,
            metaData : metaData,
            type : type,
            },
            {
                attempts : 3,
                backoff : {
                    type : 'exponential',
                    delay : 5000
                }
            }
        )

        console.log(`📩 Job added: ${job.name} (ID: ${job.id})`);
        return job.id;   

    } catch(err){
        console.log("Error comes in Adding notification to queue" , err)
        throw err;
    }

}
