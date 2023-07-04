import { Request, Response } from "express"
import Point, {IPoint} from "../models/pointsModel"

export const getAllPoints = async (req: Request, res: Response) =>{
    const points = await Point.find() as IPoint[];
    if(!points) return res.status(404).json("there are no points founded");
    res.status(200).send({ status: "success", code: 200, data: points });
}
