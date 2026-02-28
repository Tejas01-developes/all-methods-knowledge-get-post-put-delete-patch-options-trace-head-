import { db } from "../dbconnection/dbconnection.js";
import bcrypt from 'bcrypt';

export const insertuser=async(req,resp)=>{
const {id,name,password}=req.body;
if(!id || !name || !password){
    return resp.status(400).json({success:false,message:"data not recived"})
}
const hash=await bcrypt.hash(password,10);
db.query(
    'insert into users1 (id,name,password) values (?,?,?)',
    [id,name,hash],
    (err)=>{
        if(err){
            return resp.status(400).json({success:false,message:"db insertion failed"})
        }
        return resp.status(200).json({success:true,message:"inserted succesfully"})
    }
)

}


export const getdata=(req,resp)=>{
    db.query(
        'select * from users1',
        (err,res)=>{
            if(err){
                return resp.status(400).json({success:false,message:"db fetch failed"})
            }
            return resp.status(200).json({success:true,res})
        }
    )
}


export const update=async(req,resp)=>{
    const{password}=req.body;
    const{name}=req.query
    db.query(
        'select name,password from users1 where name=?',
        [name],
      async  (err,res)=>{
            if(err){
            return resp.status(400).json({success:false,message:"error seeing user with this name in the db"})
        }
        if(res.length === 0){
            return resp.status(400).json({success:false,message:"no user with this name in the db"}) 
        }
        

        // const compare=await bcrypt.compare(res[0].password,password);
        if(res[0].password === password){
            return resp.status(400).json({success:false,message:"same password as previous"})
        }
        
        db.query(
            
            'update users1 set password=? where name=?',
            [password,name],
            (err)=>{
                if(err){
                    return resp.status(400).json({success:false,message:"update failed from db"})
                }
                return resp.status(200).json({success:true,message:"update succesfully"})
            }

        )
    }
   

        
    )
}


export const deleteusers=(req,resp)=>{
const{name}=req.body;
db.query(
    'select name from users1 where name=?',
    [name],
    (err,res)=>{
        if(err){
            return resp.status(400).json({success:false,message:"db delete error"})
        }
        if(res.length === 0){
            return resp.status(400).json({success:false,message:"no user with this name"})
        }
        db.query(
            'delete from users1 where name=?',
        [name],
        (err)=>{
            if(err){
                return resp.status(400).json({success:false,message:"error db deletation"})
            }
            return resp.status(200).json({success:true,message:"delete succesfully done"})
        }
        )
    }
)

}