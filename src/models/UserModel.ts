
import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  id: {
     type : String,
     unique : true,
     default : uuidv4()
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;