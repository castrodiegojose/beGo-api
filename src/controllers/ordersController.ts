import { Request, Response } from "express";
import { checkOrderStatusService, createOrderService, deletedOrderService, getAllOrdersService, getOrderByIdService, updateOrderService } from "../services/ordersServices";
import { Status, Type } from "../models/orderModel";
import { getTruckAvailableService } from "../services/trucksServices";
import { checkIfRouteExist, createNewRouteService } from "../services/routesSerices";

export const createOrderController = async(req: Request, res:Response) => {
    const { type, description, pickup, dropoff } = req.body

    if(!type || !description || !pickup || !dropoff ){
         return res.status(400).send({
            status: "error", 
            code: 400, 
            message:"There are not any points defined"
        });
    }

    if(!Object.values(Type).includes(type)) {
        return res.status(400).send({
            status: "error", 
            code: 400, 
            message: "Invalid parameter 'type', it must be 'Express', 'Custom' or 'Standard'"
        });
    }
        
    if(!await checkIfRouteExist(pickup, dropoff)){
        const availableTrucks = await getTruckAvailableService();
        if(!availableTrucks) {
             return res.status(202).send({ 
                status: "success", 
                code: 202, 
                message: "No Trucks Available" })
        }
        await createNewRouteService(pickup, dropoff)
    }

    const newOrder = await createOrderService(type, description, pickup, dropoff);

    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: newOrder 
    });
} 

export const updateOrderController = async(req: Request, res:Response) => {
    const { id } = req.params;
    const { type, description, pickup, dropoff, newStatus } = req.body

    if(!id) {
            return res.status(400).send({
            status: "error",
            code: 400,
            message: "Missing parameter 'id'"
        });
    }
    const orderExists = await getOrderByIdService(id)
    if(!orderExists) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message: "No order found"
        });
    }
    if(!Object.values(Type).includes(type)) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message: "Invalid parameter 'type', it must be 'Express', 'Custom' or 'Standard'"
        });
    }
    if(newStatus){
        if(!Object.values(Status).includes(newStatus)){
            return res.status(400).send({
                status: "error",
                code: 400,
                message: "Invalid parameter 'status', it must be 'Taken', 'In_Progress', 'Completed' or 'Cancelled'"
            });
        }
    }

    if(await checkOrderStatusService(id)) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message: "Order in progress cannot be updated"
        });
    }
    if(!await checkIfRouteExist(pickup, dropoff)){
        const availableTrucks = await getTruckAvailableService();
        if(!availableTrucks) {
            return res.status(202).send({ 
                status: "success", 
                code: 202, 
                message: "No Trucks Available" 
            })
        }
        await createNewRouteService(pickup, dropoff)
    }
    
    const updatedOrder = await updateOrderService( id, type, description, pickup, dropoff, newStatus);

    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: updatedOrder 
    });
}

export const getAllOrdersController = async(req: Request, res:Response) => {
    const orders = await getAllOrdersService();
    if(!orders) {
        return res.status(404).send({ 
            status: "error", 
            code: 404, 
            message: "There are no orders" 
        })
    }

    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data: orders 
    });

}

export const deleteOrderController = async(req: Request, res:Response) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message:"Missing parameter 'id'"
        });
    }

    const existingOrder = await getOrderByIdService(id);
    if(!existingOrder) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"There is not route defined"
        });
    }

    if(existingOrder.status === Status.InProgress) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message:"Order in progress cannot be deleted"
        });
    }

    if(!await deletedOrderService( id )) {
        return res.status(202).send({ 
            status: "success", 
            code: 202, 
            data:`The data base does not response` 
        });
    }

    res.status(200).send({ 
        status: "success", 
        code: 200, 
        data:`Order id:${id} deleted`
    });
}
