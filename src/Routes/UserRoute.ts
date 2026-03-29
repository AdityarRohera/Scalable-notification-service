
import express from 'express';
const router = express.Router();
import type { Request , Response } from 'express';
import { signup ,login } from '../Controller/UserController.js';
import { userAuth } from '../middleware/auth.js';

import type { AuthenticatedRequest } from '../middleware/auth.js';

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

router.get('/me' , userAuth , async(req : Request , res : Response) => {
    const userReq = req as AuthenticatedRequest;
    const user = userReq.user.userId;
    res.send({
        success : true,
        message : user
    })
})

export default router;