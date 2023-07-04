import { Request, Response } from "express"
import User, {IUser} from "../models/user"
import config from "../config/default";
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) =>{
    // saving user //
    const user: IUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    const userCheckifExist = await User.findOne({email: req.body.email})
    if(userCheckifExist) return res.status(400).json(`The user ${userCheckifExist.email} already exists`);
    user.password = await user.encryptPassword(user.password)
    const savedUser = await user.save();
    // token
    // const token:string = jwt.sign({_id: savedUser._id}, config.TOKEN_SECRET_KEY || "tokenSecretKey")
    res.status(200).json(savedUser)
}

export const signin = async (req: Request, res: Response) =>{

    // check User
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json('Email is wrong');
    //check Password
    const correctPass: boolean = await user.validatePassword(req.body.password)
    if(!correctPass) return res.status(400).json('Password is wrong');

    //token
    const token:string = jwt.sign({_id: user._id}, config.TOKEN_SECRET_KEY || "tokenSecretKey", {
        expiresIn: 60 * 60 * 24
    })
    res.header('auth-token', token).json(user);
}

export const profile = async (req: Request, res: Response) =>{
    const user = await User.findById(req.userId, { password: 0 })
    if(!user) return res.status(404).json("no User found")
    res.json(user)
}