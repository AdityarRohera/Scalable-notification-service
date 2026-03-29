
import nodemailer from 'nodemailer'

interface mailSenderType {
    email : string,
    title : string,
    body : string,
    job : any
}

const mailSender = async({email , title , body , job} : mailSenderType) => {

        if(job.attemptsMade < 2){
          console.log(`❌ Failing attempt ${job.attemptsMade + 1}`);
          throw new Error("I Will Send Email Later");
        }

        // create transporter
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log("Taking Time");
        
        const transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          service: "gmail",
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
       });

       let info = await transporter.sendMail({
            from : '"Notification System" , <vibemart@gmail.com>',
            to : `${email}`,
            subject : `${title}`,
            html: body,
       })
       console.log("Message sent:", info);
    }

export default mailSender;
