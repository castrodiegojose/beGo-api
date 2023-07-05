import { Request, Response } from "express"
import { getAllTrucksService } from "../services/trucksServices";

export const getAllTrucksController = async (req: Request, res: Response) =>{
    const trucks = await getAllTrucksService();
    if(!trucks) return res.status(404).json("there are no trucks available");
    res.status(200).send({ status: "success", code: 200, data: trucks });
}
