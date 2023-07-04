import { Request, Response } from "express"
import Truck, { ITruck } from "../models/trucksModel";

export const getAllTrucks = async (req: Request, res: Response) =>{
    const trucks = await Truck.find() as ITruck[];
    if(!trucks) return res.status(404).json("there are no trucks available");
    res.status(200).send({ status: "success", code: 200, data: trucks });
}
