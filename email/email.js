import nodemailr from 'nodemailer';



const createtransport=nodemailr.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_NAME,
        pass:process.env.EMAIL_PASS
    }
})


export const sendemail=async(to, sub,text)=>{
    try{
    createtransport.sendMail({
        from:process.env.EMAIL_NAME,
        to:to,
        subject:sub,
        text:text
    })
   
}catch(err){
    console.log("error")
}
}
