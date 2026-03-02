import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const token=(user)=>{
return jwt.sign(
{name:user},
process.env.ACCESS_SECRET,
{expiresIn:'10min'}
)
}