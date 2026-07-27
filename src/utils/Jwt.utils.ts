import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/jwt.interface";
import { ENV_CONFIG } from "../config/env.config";

export const generateJwtToken = (payload: IJwtPayload) => {
  try {
    const token = jwt.sign(payload, ENV_CONFIG.JWT_SECRET, {
      expiresIn: ENV_CONFIG.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });

    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyToken =(token:string)=>{
  try{
  return jwt.verify(token, ENV_CONFIG.JWT_SECRET) as IJwtPayload;
}catch(error){
  console.log(error);
  throw error;
}
};