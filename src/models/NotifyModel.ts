// Models/notifyModel.js

import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const notifySchema = new Schema(
    {
        notifyId : {
            type : String,
            default: uuidv4,
            unique : true
        },


        userId: { 
            type: String, 
            required : true,
            index: true
        },

        type : {
            type : String,
            enum: ['USER_SIGNUP', 'ORDER_PLACED', 'PAYMENT_SUCCESS'],
            required: true
        },

        message : {
            type : String,
            required : true
        },

        channel : {
            type : String,
            enum : ['EMAIL' , 'SMS' , 'IN_APP', 'PUSH'],
            required : true
        },

        status: {
            type: String,
            enum: ['PENDING', 'SENT', 'FAILED'],
            default: 'PENDING',
            index: true
        },

        metaData : {
            type: Schema.Types.Mixed,
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

const NotifyModel = mongoose.model("notify", notifySchema);
export default NotifyModel;