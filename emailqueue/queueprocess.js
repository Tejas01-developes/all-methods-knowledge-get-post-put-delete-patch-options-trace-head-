import { emailqueue } from "./emailqueue.js";
import { sendemail } from "../email/email.js";


emailqueue.process(async(job)=>{
    const{to,subject,text}=job.data;
    console.log("processing email job ....")
    await sendemail(to,subject,text);
    console.log("email send succesfully");
})