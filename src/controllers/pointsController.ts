import { Request, Response } from "express"
import { getAllPointsService } from "../services/pointsServices"

export const getAllPointsController = async (req: Request, res: Response) =>{
    const points = await getAllPointsService();
    if(!points) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"There are no points founded"
        });
    }
    
    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: points 
    });
}
