
import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT || 3000;
import cors from 'cors'

// middlewares
app.use(express.json());

app.use(cors());

import dbConnect from './config/dbConnect.js';
dbConnect();


import router from './Routes/UserRoute.js';
import notifyRouter from './Routes/NotifyRoute.js'
app.use('/api/v1' , router);
app.use('/api/v1' , notifyRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

