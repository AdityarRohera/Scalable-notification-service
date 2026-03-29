// Models/notifyModel.js

import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const notifySchema = new Schema(
    {
        notifyId : {
            type : String,
            default: () => uuidv4(),
            unique : true
        },

        client: {
            type: String,
            ref: "clients",
            required: true
        },

        externalUserId: { 
            type: String,
        },

        recipient : {
             email: { type: String },
             phone: { type: String },
            //  deviceToken: { type: String }
        },

        type : {
            type : String,
            required: true
        },

        message : {
            type : String,
            required : true
        },

        channel : {
            type : String,
            enum : ['EMAIL' , 'SMS' , 'IN_APP', 'PUSH'],
            default : 'EMAIL',
            required : true
        },

        status: {
            type: String,
            enum: ['QUEUED', 'PROCESSING', 'SENT', 'FAILED'],
            default: 'QUEUED',
            index: true
        },

        metaData : {
            type: Schema.Types.Mixed,
            default : null
        },

        jobId : {
            type : String,
        },

        attempts : {
            type : Number,
            default : 0
        },

        error : {
            type : String,
            default : null
        },

        sentAt : {
            type : Date
        }

    },
    {
        timestamps: true,
    }
);

const NotifyModel = mongoose.model("notifications", notifySchema);
export default NotifyModel;