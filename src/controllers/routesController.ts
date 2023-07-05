import { Request, Response } from "express";
import { IPoint } from "../models/pointsModel";
import { checkIfRouteExist, createNewRouteService, deleteRouteService, getAllRoutesService, getRouteByIdService, updateRouteService } from "../services/routesSerices";
import { getPlaceIdByNamePointsService } from "../services/pointsServices";
import { getOrderByRouteIdService } from "../services/ordersServices";

export const createRouteController = async(req: Request, res:Response) => {
    const { pointA, pointB } = req.body;
    if(!pointA || !pointB) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message:"There are not any points defined"
        });
    }

    if(await checkIfRouteExist(pointA, pointB)) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"Route already exists"
        });
    }

    const newRoute = await createNewRouteService(pointA, pointB);
    if(!newRoute) {
        return res.status(202).send({ 
            status: "success", 
            code: 202, 
            message: `No Trucks Available` });
    }
        
    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: newRoute 
    });
} 

export const getAllRoutesController = async(req: Request, res:Response) => {
    const routes = await getAllRoutesService();
    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: routes 
    });
} 

export const getRouteByIdController = async(req: Request, res:Response) => {
    const { id } = req.params;
    if(!id) { 
        return res.status(400).send({
            status: "error",
            code: 400,
            message:"Missing parameter 'id'"
        });
    }

    const route = await getRouteByIdService(id);
    if(!route) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:`There is not route defined with id: ${id}`
        });
    }

    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: route 
    });
} 

export const updateRouteController = async(req: Request, res:Response) => {
    const { id } = req.params;
    const { pointA, pointB } = req.body;
    if(!pointA || !pointB || !id){
        return res.status(400).send({
            status: "error",
            code: 400,
            message:"Some points or id are missing"
        });
    }

    const existingRoute = await getRouteByIdService(id);
    if(!existingRoute) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"There is not route defined"
        });
    }
     
    const orderUsingRoute = await getOrderByRouteIdService(id)
    if(orderUsingRoute) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"Can not be deleted, there is an order using the route"
        });
    }


    const placeIdFrom = await getPlaceIdByNamePointsService(pointA);
    const placeIdTo = await getPlaceIdByNamePointsService(pointB);

    if(!placeIdFrom || !placeIdTo) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"New points does not exist"
        });
    }

    const updatedRoute = await updateRouteService(id, pointA, pointB, placeIdFrom, placeIdTo);

    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: updatedRoute 
    });
}

export const deleteRouteController = async(req: Request, res:Response) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message:"Missing parameter 'id'"
        });
    }

    const existingRoute = await getRouteByIdService(id);
    if(!existingRoute) { 
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"There is not route defined"
        });
    }

    const orderUsingRoute = await getOrderByRouteIdService(id)
    if(orderUsingRoute) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"Can not be deleted, there is an order using the route"
        });
    }

    if(!await deleteRouteService(id)) {
        return res.status(202).send({ 
            status: "success", 
            code: 202, 
            message:`The data base does not response` });
    }
    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data:`Route id:${id} deleted` 
    });
}

