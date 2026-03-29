
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


// all api's
import router from './Routes/UserRoute.js';
import notifyRouter from './Routes/NotifyRoute.js'
import clientRouter from './Routes/ClientRoute.js';

app.use('/api/v1' , router);
app.use('/api/v1/notification' , notifyRouter);
app.use('/api/v1/client' , clientRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

