import Truck, { ITruck } from "../models/trucksModel";

export async function getAllTrucksService(): Promise<ITruck[]> { 
    return await Truck.find() as ITruck[]; 
}
