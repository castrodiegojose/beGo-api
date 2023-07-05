import { IPoint } from "models/pointsModel";
import Route, { IRoute } from "../models/routesModel";
import { getCoordinatesForPlaceId, calculateRouteDistance } from "../utils/googleApi";
import { getPlaceIdByNamePointsService } from "./pointsServices";
import { UpdateQuery } from "mongoose";


export async function createNewRouteService(pointA: IPoint, pointB:IPoint): Promise<IRoute | undefined>{
    try{
        const placeIdA = pointA.location.placeId;
        const placeIdB = pointB.location.placeId;

        console.log(placeIdA + " " + placeIdB)

        const coordenatesOrigin = await getCoordinatesForPlaceId(<string>placeIdA);
        const coordenatesDestination = await getCoordinatesForPlaceId(<string>placeIdB);

        console.log(coordenatesOrigin?.latitude + " " +coordenatesDestination?.latitude)

        const origin = `${coordenatesOrigin?.latitude},${coordenatesOrigin?.longitude}`;
        const destination = `${coordenatesDestination?.latitude},${coordenatesDestination?.longitude}`;

        const distance = await calculateRouteDistance(origin, destination);

        const newRouteCreated = await Route.create({
            pointA: pointA.location.name,
            pointB: pointB.location.name,
            route: {
                from: {
                    latitude: coordenatesOrigin?.latitude,
                    longitude: coordenatesOrigin?.longitude
                },
                to: {
                    latitude: coordenatesDestination?.latitude,
                    longitude: coordenatesDestination?.longitude
                },
                distance,
            }
        }) as IRoute;

        console.log(newRouteCreated)

        await newRouteCreated.save();

        return newRouteCreated;
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function checkIfRouteExist(pointA: IPoint, pointB: IPoint): Promise<boolean> {
    const fromName = pointA.location.name;
    const toName = pointB.location.name;

    const route = await Route.find({
        pointA: fromName,
        pointB: toName,
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
            route: {
                from:{
                    latitude:coordenatesOrigin?.latitude,
                    longitude:coordenatesOrigin?.longitude
                },
                to:{
                    latitude: coordenatesDestination?.latitude,
                    longitude: coordenatesDestination?.longitude
                },
                distance,
            }
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