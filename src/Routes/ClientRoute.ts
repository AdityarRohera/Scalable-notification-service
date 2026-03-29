
import express from 'express';
import { createClient } from '../Controller/ClientController.js';
import { userAuth } from '../middleware/auth.js';

const clientRouter = express.Router();

// notifyRouter.use('/notify' ,)

clientRouter.post('/new' , userAuth , createClient);

export default clientRouter;