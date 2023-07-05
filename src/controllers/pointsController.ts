import { Request, Response } from "express"
import { getAllPointsService } from "../services/pointsServices"

export const getAllPointsController = async (req: Request, res: Response) =>{
    const points = await getAllPointsService();
    if(!points) return res.status(404).json("There are no points founded");
    res.status(200).send({ status: "success", code: 200, data: points });
}
