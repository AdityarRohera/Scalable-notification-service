
import express from 'express'
import type { Request , Response } from 'express';
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
// import {createNotification } from '../queues/notification.queue.js';
const secret = process.env.TOKEN_SECRET;
import type { AuthenticatedRequest } from '../middleware/auth.js';
import { getUser } from '../services/userService.js';

// Signup controller
export async function signup(req : Request, res : Response) {
  try {
    const { email, name, password } = req.body;
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user
    const user = await UserModel.create({ email, name, password: hashedPassword });


    // try{
    //         // now send mail to user;
    //       await createNotification(
    //         {
    //           userId : user.id,
    //           channel : 'EMAIL',
    //           message : `Welcome ${user.name} to our notification system`,
    //           metaData : {name : user.name || 'user' , email : user.email , title : `Welcome Mail`},
    //           type : 'USER_SIGNUP'
    //         }
    //       )
    // } catch(err){
    //   console.log("Error comes in send notification job" , err);
    // }
    
    
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' , errMessage :error });
  }
}

// Login controller
export async function login(req : Request, res : Response) {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

     // now create token for user
             const token = secret ? jwt.sign({
               userId : user.id
             } , secret, {expiresIn: '3d'}) : null;
    
    return res.status(200).json({ message: 'Login successful', user , token});
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getUserHandler = async(req : Request , res : Response) => {
  try{
          const AuthRequest = req as AuthenticatedRequest
          const {userId} = AuthRequest.user
          console.log("IsAdmin getting user id -> " , userId);

          const user = getUser(userId);

          return res.status(200).json({
            success : false,
            message : "Get user Successfully",
            user : user
          })

  } catch(err){
    return res.status(500).json({ error: 'Internal server error' , errMessage :err});
  }
}