import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const ClientSchema = new Schema(
  {

    clientId : {
        type : String,
        default : () => uuidv4(),
        unique : true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    apiKey: {
      type: String,
      required: true,
      unique: true
    },

    isActive: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true
  }
);

const ClientModel = mongoose.model("clients", ClientSchema);
export default ClientModel;