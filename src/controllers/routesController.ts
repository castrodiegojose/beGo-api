import { Request, Response } from "express";
import { IPoint } from "../models/pointsModel";
import { checkIfRouteExist, createNewRouteService, deleteRouteService, getAllRoutesService, getRouteByIdService, updateRouteService } from "../services/routesSerices";
import { getPlaceIdByNamePointsService } from "../services/pointsServices";

export const createRouteController = async(req: Request, res:Response) => {
    const { pointA, pointB } = req.body as unknown as { pointA: IPoint, pointB: IPoint };
    if(!pointA || !pointB) return res.status(404).json("There are not any points defined");
    if(await checkIfRouteExist(pointA, pointB)) return res.status(404).json("Route already exists");
    
    const newRoute = await createNewRouteService(pointA, pointB);
    res.status(200).send({ status: "success", code: 200, data: newRoute });
} 

export const getAllRoutesController = async(req: Request, res:Response) => {
    const routes = await getAllRoutesService();
    res.status(200).send({ status: "success", code: 200, data: routes });
} 

export const getRouteByIdController = async(req: Request, res:Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).json("Missing parameter 'id'");
    const route = await getRouteByIdService(id);
    if(!route) return res.status(404).json("There is not route defined");
    res.status(200).send({ status: "success", code: 200, data: route });
} 

export const updateRouteController = async(req: Request, res:Response) => {
    const { id } = req.params;
    const { pointA, pointB } = req.body;
    if(!pointA || !pointB || !id) return res.status(400).json("Some points or id are missing");
    const existingRoute = await getRouteByIdService(id);
    if(!existingRoute) return res.status(404).json("There is not route defined");

    const placeIdFrom = await getPlaceIdByNamePointsService(pointA);
    const placeIdTo = await getPlaceIdByNamePointsService(pointB);

    if(!placeIdFrom || !placeIdTo) return res.status(404).json("New points does not exist");

    const updatedRoute = await updateRouteService(id, pointA, pointB, placeIdFrom, placeIdTo);

    res.status(200).send({ status: "success", code: 200, data: updatedRoute });

}

export const deleteRouteController = async(req: Request, res:Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).json("Missing parameter 'id'");
    const existingRoute = await getRouteByIdService(id);
    if(!existingRoute) return res.status(404).json("There is not route defined");

    if(!await deleteRouteService(id)) return res.status(202).send({ status: "success", code: 202, data:`The data base does not response` });
    res.status(200).send({ status: "success", code: 200, data:`Route id:${id} deleted` });
}

