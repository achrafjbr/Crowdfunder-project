import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authenticationRouter from './src/routes/authenticationRouter.js';
import  PREFIX_ROUTE_PATH  from './src/utils/constants.js';
import projetRouter from './src/routes/projectRoute.js';
const app = express();
dotenv.config();

app.use(express.json());

//Database Connection.
connectDB();

app.use(`${PREFIX_ROUTE_PATH}/auth`, authenticationRouter),

app.use(`${PREFIX_ROUTE_PATH}/project`,projetRouter)





















app.listen(process.env.PORT || 3000, (err)=>{if(!err)console.log('Start Server...')})