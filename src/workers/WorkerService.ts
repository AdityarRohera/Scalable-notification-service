

// Implement worker for queue -> # Background processors

import dbConnect from '../config/dbConnect.js';
dbConnect();

import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import mailSender from '../services/EmailService.js';
import NotifyModel from '../models/NotifyModel.js';

const worker = new Worker('notification-queue' , async(job : any) => {

  const {channel , message , recipient , notificationId , metaData} = job.data;

  try{


        // first create notification 
          // const newNotification = await NotifyModel.create({
          //   recipient,
          //   message,
          //   channel,
          //   metaData,
          //   type,
          //   status: 'QUEUED'
          // });
          // console.log('📩 Notification saved:', newNotification);


          // First update job
          await NotifyModel.findByIdAndUpdate(notificationId , {status : 'PROCESSING'})

                switch (channel) {

                    case 'EMAIL':
                      await mailSender({email : recipient.email , title : metaData.title || 'Notification' , body : message , job});
                      await NotifyModel.findByIdAndUpdate(
                                                    notificationId,
                                                    {status : 'SENT' ,  sentAt: new Date() , attempts : job.attemptsMade + 1}
                                                  );
                      break;


                    case 'SMS':
                    console.log('📱 SMS logic pending');
                    break;

                    default:
                    throw new Error(`Unsupported channel: ${job.data.channel}`);
                  }


  } catch(err : any){
    console.log("Error comes in notification worker" , err);
    await NotifyModel.findByIdAndUpdate( notificationId,
                                           {status : 'FAILED' ,  sentAt: new Date() ,  error: err.message , attempts: job.attemptsMade + 1}
                                          );
              throw err;
  }
} , {connection : redisConnection , concurrency: 5})


worker.on('active', (job) => {
  console.log(`🚀 Processing job ${job.id}`);
})


worker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});


