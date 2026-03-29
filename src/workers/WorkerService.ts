

// Implement worker for queue -> # Background processors
import { v4 as uuidv4 } from 'uuid';

import dbConnect from '../config/dbConnect.js';
dbConnect();

import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import mailSender from '../services/EmailService.js';
import NotifyModel from '../models/NotifyModel.js';

const worker = new Worker('notification-queue' , async(job : any) => {

  try{

          const {userId , channel , message , metaData , type} = job.data;



        // first create notification 
          const newNotification = await NotifyModel.create({
            userId,
            message,
            channel,
            metaData,
            type,
            status: 'PENDING'
          });
          console.log('📩 Notification saved:', newNotification);



          try{

                switch (job.data.channel) {

                    case 'EMAIL':
                      await mailSender({email : metaData.email , title : metaData.title || 'Notification' , body : message , job});
                      await NotifyModel.updateOne({_id : newNotification._id} , {$set : {status : 'SENT' ,  sentAt: new Date()}});
                      break;

                    case 'SMS':
                    console.log('📱 SMS logic pending');
                    break;

                    default:
                    throw new Error(`Unsupported channel: ${job.data.channel}`);
                  }

          } catch(err){
              await NotifyModel.updateOne({_id : newNotification._id} , {$set : {status : 'FAILED' ,  sentAt: new Date()}});
              throw err;
          }


  } catch(err){
    console.log("Error comes in notification worker" , err);
    throw err;
  }
} , {connection : redisConnection})


worker.on('active', (job) => {
  console.log(`🚀 Processing job ${job.id}`);
})


worker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});


