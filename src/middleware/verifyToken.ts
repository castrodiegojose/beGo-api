import { Request, Response, NextFunction } from "express"
import config from "../config/default";
import jwt from "jsonwebtoken"

interface IResponseDecode {
    valid: boolean;
    payload: string | jwt.JwtPayload | null;
}

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Access denied: Invalid token')

    const { valid, payload } = decodeToken(token) as { valid:boolean, payload: IPayload }

    if (!valid) {
        return res.status(500).send({
            status: "error",
            code: 500,
            message: "Invalid token or expired token",
        });
    }
    
    req.userId = payload._id;
    next()
   

}

function decodeToken(token: string): IResponseDecode {
    try {
        const payload = jwt.verify(token, config.TOKEN_SECRET_KEY || 'tokenwhatever') as IPayload
        return { valid: true, payload };
        
    }catch(err) {
        const error = <Error>err;
        console.error(error);

        return {
            valid: false,
            payload: null,
        };

    }
}