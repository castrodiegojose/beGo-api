import { Request, Response } from "express"
import User, {IUser} from "../models/userModel"
import config from "../config/default";
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) =>{
    // saving user //
    const user: IUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    const userCheckifExist = await User.findOne({email: req.body.email})
    if(userCheckifExist) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message:`The user ${userCheckifExist.email} already exists`
        });
    }
    user.password = await user.encryptPassword(user.password)
    const savedUser = await user.save();
    
    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: savedUser 
    });
}

export const signin = async (req: Request, res: Response) =>{

    // check User
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message:'Email is wrong'
        });
    }
    //check Password
    const correctPass: boolean = await user.validatePassword(req.body.password)
    if(!correctPass) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message:'Password is wrong'
        });
    }

    //token
    const token:string = jwt.sign({_id: user._id}, config.TOKEN_SECRET_KEY || "tokenSecretKey", {
        expiresIn: 60 * 60 * 24
    })
    res.header('auth-token', token).send({ 
        status: "success", 
        code: 200, 
        data: user 
    });
}
