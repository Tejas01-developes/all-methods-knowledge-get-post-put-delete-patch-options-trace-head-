import { db } from "../dbconnection/dbconnection.js"

export const insertquery=(data)=>{
    return new Promise((resolve,reject)=>{
        db.query(
            'insert into users1 (id,name,password) values (?,?,?)',
            [data.id,data.name,data.password],
            (err)=>{
                if(err){
                    return reject("insert error")
                }
                return resolve("success")
            }
        )
    })
   
}


export const selectquery=(data)=>{
    return new Promise((resolve,reject)=>{
        db.query(
            'select * from users1 ',
            (err,res)=>{
                if(err){
                    return reject("error")
                }
                return resolve(res)
            }
        )
    })

}


export const getquery=(data)=>{
    return new Promise((resolve,reject)=>{
        db.query(
            'select name,password from users1 where name= ? ',
            [data.name],
            (err,res)=>{
                if(err){
                    return reject(err)
                }
                if(res.length === 0){
                    return reject(err)
                }
                resolve(res[0].password);
            }
        )
    })
   
    }

    export const updatequery=(data)=>{
       return new Promise((resolve,reject)=>{
        db.query(
            'update users1 set password= ? where name= ?',
            [data.password,data.name],
            (err)=>{
                if(err){
                    return reject("error",err)
                }
                return resolve("success")
            }
        )
       })
       
       
    }


    export const findquery=(data)=>{
        return new Promise((resolve,reject)=>{
            db.query(
                "select name from users1 where name=?",
                [data.name],
                (err,res)=>{
                    if(err){
                        return reject("finding error")
                    }
                    if(res.length === 0){
                        return reject("no user")
                    }
                    resolve("user is present")
                }
            )
        })
        
    }


    export const deletequery=(data)=>{
        return new Promise((resolve,reject)=>{
            db.query(
                'delete  from users1 where name=?',
                [data.name],
                (err)=>{
                    if(err){
                        return reject("deletation error")
                    }
                    return resolve("success")
                }
            )
        })
    }