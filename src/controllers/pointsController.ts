import { Request, Response } from "express"
import Point, {IPoint} from "../models/pointsModel"

export const getAllPoints = async (req: Request, res: Response) =>{
    const points = await Point.find()
    if(!points) return res.status(404).json("there are no points founded")
    res.json(points)
}