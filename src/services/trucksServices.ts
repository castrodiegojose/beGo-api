import { IRoute } from "../models/routesModel";
import Truck, { ITruck } from "../models/trucksModel";
import { getAllRoutesService } from "./routesSerices";

export async function getAllTrucksService(): Promise<ITruck[]> { 
    return await Truck.find() as ITruck[]; 
}

export async function getTruckByNameService(name: string): Promise<string | undefined> {
    try {
        const truck = await Truck.findOne({
            model: name
        }) as ITruck
        return truck._id
    }
    catch (err) {
        console.error(err)
    }
}

export async function getTruckAvailableService(): Promise<string | null | undefined> {
    try{
        const trucks = await getAllTrucksService() as ITruck[];
        const routes = await getAllRoutesService() as unknown as IRoute[];
        
        if (routes.length === 0) {
            return trucks[0]._id        
        } else if (routes.length > 0 ) {
            const notAvailableTrucksId = routes.map((route:IRoute) => route.truckAssigned);
            const availableTrucks = await Truck.find({
                _id: { $nin: notAvailableTrucksId },
            })
         
            if( availableTrucks.length === 0 ) {
                return null;
            }
            return availableTrucks[0]._id;
        } else {
            return null;
        }
    }
    catch (error) {
        console.error(error);
    }

}
