import mongoose, { Schema, model, Document } from "mongoose";
// import { ITruck } from "./trucksModel";
// import { IRoute } from "./routesModel";

export enum Type {
    Standard = "Standard",
    Express = "Express",
    Custom = "Custom",
}

export enum Status {
    Taken = "Taken",
    InProgress = "In_Progress",
    Completed = "Completed",
    Cancelled = "Cancelled",
}

export interface IOrder extends Document {
    type: string;
    description: string;
    route: string;
    status: string;
    truck: string;
};

const ordersSchema = new Schema({
    type: { type: String, enum: Object.values(Type)},
    description: { type: String },
    route: { 
        type: mongoose.Types.ObjectId,
        ref: "Route",
        required: true
        },
    status: { type: String, enum: Object.values(Status)},
    truck: { 
        type: mongoose.Types.ObjectId,
        ref: "Truck",
        required: true, 
    }
});

export default model<IOrder>('Order', ordersSchema);
