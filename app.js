import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import './emailqueue/queueprocess.js';
import './cron/cron.js';
dotenv.config();

const app=express();

app.use(express.json());
app.use("/apis",router);

app.listen(process.env.PORT,()=>{
console.log(`port working on ${process.env.PORT}` )
})
