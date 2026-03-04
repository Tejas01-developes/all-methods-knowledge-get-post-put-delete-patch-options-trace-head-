import { db } from "../dbconnection/dbconnection.js";
import bcrypt from 'bcrypt';
import { token } from "../tokens/token.js";
import jwt from 'jsonwebtoken';
import { deletequery, findquery, getquery, insertquery, selectquery, updatequery } from "../query_file/queries.js";


export const insertuser=async(req,resp)=>{
const {id,name,password}=req.body;
if(!id || !name || !password){
    return resp.status(400).json({success:false,message:"data not recived"})
}
try{
const hash=await bcrypt.hash(password,10);
const insert=await insertquery({id,name,password:hash})
return resp.status(200).json({success:true,message:"db insert success"})

}catch(err){
console.log("error",err)
return resp.status(400).json({success:false,message:"db insert failed"})
}

}



export const getdata=async(req,resp)=>{
    try{
    const getdata=await selectquery()
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
    db.query(
        'select name,password from users1 where name=?',
        [name],
       async (err,res)=>{
            if(err){
                return resp.status(400).json({success:false,message:"db login error"})
            }
            if(res.length === 0){
                return resp.status(400).json({success:false,message:"no user with this name"})
            }
            const compare=await bcrypt.compare(password,res[0].password);
            if(!compare){
                return resp.status(400).json({success:false,message:"password is incorrect"})
            }
            const tokenn=token(name)
            const decode= jwt.decode(tokenn,{complete:true})
            resp.cookie("token",tokenn,{
                httpOnly:true,
                sameSite:'Lax',
                secure:true,
                path:'/'

            })
            return resp.status(200).json({success:true,message:"login success","token":decode})
        }
    )
}catch(err){
    console.log("error",err)
}
}