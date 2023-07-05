import { UpdateQuery } from "mongoose";
import Order, { Status, IOrder } from "../models/orderModel";
import { getRouteIdForOrder } from "./routesSerices";
import { getTruckByNameService } from "./trucksServices";
import { IRoute } from "../models/routesModel";


export async function createOrderService(
    type: string, 
    description: string, 
    pickup: string, 
    dropoff: string ): Promise<IOrder | undefined>{
    try{        
        // const truckId = await getTruckByNameService(truckName);
        const route = await getRouteIdForOrder(pickup, dropoff) as IRoute;
        const status = Status.Taken;

        const newOrderCreated = await Order.create({
            type,
            description,
            route: route._id,
            status,
            truck: route.truckAssigned,
        }) as IOrder;

        await newOrderCreated.save();

        return newOrderCreated;
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function checkOrderStatusService(id:string): Promise<boolean | undefined>{
    try {
        const order = await Order.findById(id) as IOrder;
        if (order.status === Status.InProgress) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }    
}

export async function updateOrderService(
    id: string,
    type: string, 
    description: string, 
    pickup: string, 
    dropoff: string, 
    newStatus: string): Promise<IOrder | undefined>{
        try {
            const route = await getRouteIdForOrder(pickup, dropoff) as IRoute;
            
            const updateQuery = {
                type,
                description,
                route: route._id,
                status: newStatus,
                truck: route.truckAssigned
            } as UpdateQuery<IOrder>;

            
            const orderUpdated = await Order.findOneAndUpdate( {_id: id}, updateQuery, {new: true}) as IOrder;
           
            return orderUpdated;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
}

export async function getAllOrdersService(): Promise<IOrder[] | undefined> {
    try {         
        return await Order.find() as IOrder[];
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function deletedOrderService(id: string): Promise<boolean | undefined> {
    try {
        const deleteOrder = await Order.deleteOne({ _id: id } );
        if(!deleteOrder.acknowledged) return false
        return true
    } catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function getOrderByIdService(id: string): Promise<IOrder | undefined> {
    try {
        const order = await Order.findById(id) as IOrder;
        return order
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}

export async function getOrderByRouteIdService(routeId: string): Promise<IOrder | undefined> {
    try {
        const order = await Order.findOne({
            route: routeId,
        }) as IOrder;

        return order; 
    }
    catch (err) {
        console.error(`Data base error: ${err}`);
    }
}