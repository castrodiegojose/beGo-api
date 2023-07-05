import { IPoint } from "models/pointsModel";
import Route, { IRoute } from "../models/routesModel";
import { getCoordinatesForPlaceId, calculateRouteDistance } from "../utils/googleApi";
import { getPlaceIdByNamePointsService } from "./pointsServices";
import { UpdateQuery } from "mongoose";
import { getTruckAvailableService } from "./trucksServices";


export async function createNewRouteService(pointA: string, pointB: string): Promise<IRoute | string | undefined | object>{
    try{
        const placeIdFrom = await getPlaceIdByNamePointsService(pointA);
        const placeIdTo = await getPlaceIdByNamePointsService(pointB);

        const coordenatesOrigin = await getCoordinatesForPlaceId(<string>placeIdFrom);
        const coordenatesDestination = await getCoordinatesForPlaceId(<string>placeIdTo);

        const origin = `${coordenatesOrigin?.latitude},${coordenatesOrigin?.longitude}`;
        const destination = `${coordenatesDestination?.latitude},${coordenatesDestination?.longitude}`;

        const distance = await calculateRouteDistance(origin, destination);

        const truckId = await getTruckAvailableService();

        if(!truckId) throw new Error("No truck available");

        const newRouteCreated = await Route.create({
            pointA,
            pointB,
            coordenatesPointA: {
                    latitude: coordenatesOrigin?.latitude,
                    longitude: coordenatesOrigin?.longitude
                },
            coordenatesPointB: {
                    latitude: coordenatesDestination?.latitude,
                    longitude: coordenatesDestination?.longitude
                },
            distance, 
            truckAssigned: truckId           
        }) as IRoute;

        await newRouteCreated.save();

        return newRouteCreated;
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function checkIfRouteExist(pointA: IPoint, pointB: IPoint): Promise<boolean> {
    // const fromName = pointA;
    // const toName = pointB;

    const route = await Route.find({
        pointA,
        pointB,
    })

    if(route.length !== 0) return true;
    return false;
}

export async function getAllRoutesService(): Promise<IRoute[] | undefined> {
    try {
        const routes = await Route.find();
        return routes
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function getRouteByIdService(id: string): Promise<IRoute | undefined> {
    try {
        const route = await Route.findById(id) as IRoute;
        return route
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function updateRouteService(id: string, pointA: string, pointB: string, placeIdFrom: string, placeIdTo: string): Promise<IRoute | undefined> {
    try {
        const coordenatesOrigin = await getCoordinatesForPlaceId(<string>placeIdFrom);
        const coordenatesDestination = await getCoordinatesForPlaceId(<string>placeIdTo);

        const origin = `${coordenatesOrigin?.latitude},${coordenatesOrigin?.longitude}`;
        const destination = `${coordenatesDestination?.latitude},${coordenatesDestination?.longitude}`;

        const distance = await calculateRouteDistance(origin, destination);

        const updateQuery = {
            pointA,
            pointB,
            coordenatesPointA: {
                    latitude:coordenatesOrigin?.latitude,
                    longitude:coordenatesOrigin?.longitude
                },
            coordenatesPointB: {
                    latitude: coordenatesDestination?.latitude,
                    longitude: coordenatesDestination?.longitude
                },
            distance,            
        } as UpdateQuery<IRoute>;

        const routeUpdated = await Route.findByIdAndUpdate({ _id: id }, updateQuery, { new: true }) as IRoute;

        return routeUpdated;
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function deleteRouteService(id: string): Promise<boolean | undefined> {
    try {
        const deleteRoute = await Route.deleteOne({ _id: id } );
        if(!deleteRoute.acknowledged) return false
        return true
    } catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function getRouteIdForOrder(pickup: string, dropoff: string): Promise<IRoute | undefined> {
    try {

        let assignRoute: IRoute;

        assignRoute = await Route.findOne({
            pointA: pickup,
            pointB: dropoff
        }) as unknown as IRoute

        return assignRoute

    } catch (err) {
        console.error(`Data base error: ${err}`);
    }
}
