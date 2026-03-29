import express from 'express';
import { createNotificationHandler } from '../Controller/NotifyController.js';
import { authMiddleware } from '../middleware/auth.js';

const notifyRouter = express.Router();

// notifyRouter.use('/notify' ,)

notifyRouter.post('/send' , authMiddleware , createNotificationHandler);

export default notifyRouter;