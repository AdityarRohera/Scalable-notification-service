import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const url = process.env.DATABASE_URL;

const dbConnect = async() => {
    try{

        if(!url){
            console.log("connection string undefined")
            return;
        }

        const connect = await mongoose.connect(url);

        if(connect){
            console.log("db connect successfully")
        }

    } catch(err: unknown){
        let errMessage;
        if(err instanceof Error){
            errMessage = err.message
        } else{
            errMessage = err
        }
        
        console.log(errMessage);    

    }
}

export default dbConnect;