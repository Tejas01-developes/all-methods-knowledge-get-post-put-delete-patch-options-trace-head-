import { db } from "../dbconnection/dbconnection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { deletequery, findquery, getquery, insertquery, selectquery, updatequery } from "../query_file/queries.js";
import { accesstoken, refreshtoken } from "../tokens/token.js";
import { sendemail } from "../email/email.js";
import { emailqueue } from "../emailqueue/emailqueue.js";
import cron from 'node-cron';

export const insertuser=async(req,resp)=>{
const {id,name,password}=req.body;
if(!id || !name || !password){
    return resp.status(400).json({success:false,message:"data not recived"})
}
try{
const hash=await bcrypt.hash(password,10);
const insert=await insertquery({id,name,password:hash})


await emailqueue.add({
   to:name,
   subject:"welcome mail",
    text:"welcome to our service"
})
return resp.status(200).json({success:true,message:"db insert success"})


}catch(err){
console.log("error",err)
return resp.status(400).json({success:false,message:"db insert failed"})
}

}



export const getdata=async(req,resp)=>{
    try{
    const getdata=await selectquery()
    const names=getdata.map(names=>names.name);

        cron.schedule("* * * * *",()=>{
            names.forEach(email=>{
                emailqueue.add({
                    to:email,
                    subject:"daily email",
                    text:"this is our daily email"
                 })
            })
            
        })
        // console.log(names)
    return resp.status(200).json({success:true,getdata})
    
}catch(err){
    console.log("error",err)
    return resp.status(400).json({success:false,message:"db get data failed"})
}
}


export const update=async(req,resp)=>{
    const{name,password}=req.body;
    if(!name || !password){
        return resp.status(400).json({success:false,message:"fields are not present"})
    }
   try{
  const pass=await getquery({name,password})
        const compare=await bcrypt.compare(password,pass);
       
        if(compare){
            return resp.status(400).json({success:false,message:"same password as previous"})
        }
        const hash=await bcrypt.hash(password,10);
     
      const updation=await updatequery({password:hash,name})
      return resp.status(200).json({success:true,message:"password updated succesfully"})
    }catch(err){
        console.log("error",err)
        return resp.status(400).json({success:false,message:"updation failed"})
    }    
}




export const deleteusers=async(req,resp)=>{
const{name}=req.body;
if(!name){
    return resp.status(400).json({success:false,message:"name field is not present"})
}
try{
const findname=await findquery({name})
}
catch(err){
    return resp.status(400).json({success:false,message:"no user found"})
}
try{
        const deleteuser=await deletequery({name})
        return resp.status(200).json({success:true,message:"deletation success"})
    }catch(err){
        console.log("error",err)
        return resp.status(400).json({success:false,message:"deletation failed"})
    }
    

}




export const login=async(req,resp)=>{
    const{name,password}=req.body;

    if(!name || !password){
        return resp.status(400).json({success:false,message:"fields are not present"})
    }
try{
const loginuser=await getquery({name})

            const compare=await bcrypt.compare(password,loginuser);
            if(!compare){
                return resp.status(400).json({success:false,message:"password is incorrect"})
            }
            const accesstokenn=accesstoken(name)
            const refreshtokenn=refreshtoken(name)
            
            resp.cookie("token",refreshtokenn,{
                httpOnly:true,
                sameSite:'Lax',
                secure:true,
                path:'/'

            })
            return resp.status(200).json({success:true,message:"login success","access":accesstokenn})
        }catch(err){
            console.log("error",err)
        return resp.status(400).json({success:false,message:"login error"})
        }

}


