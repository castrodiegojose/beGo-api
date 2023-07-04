import { Request, Response, NextFunction } from "express"
import config from "../config/default";
import jwt from "jsonwebtoken"

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.header('auth-token');
    if(!token) return res.status(400).json('Acceso denied')

    const payload = jwt.verify(token, config.TOKEN_SECRET_KEY || 'tokenwhatever') as IPayload
    req.userId = payload._id;
    next()
}