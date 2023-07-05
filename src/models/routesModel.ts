import mongoose, { Schema, model, Document } from "mongoose";

export interface ICoordenates {
    latitude: number;
    longitude: number;
}

export interface IRoute extends Document {
    pointA: string;
    pointB: string;
    coordenatesPointA: ICoordenates;
    coordenatesPointB: ICoordenates
    distance: string;
    truckAssigned: string;
};


const routeSchema = new Schema({
    pointA: { type: String },
    pointB: { type: String },
    coordenatesPointA : { 
            latitude: { type: Number },
            longitude: { type: Number }, 
        },
    coordenatesPointB : {
            latitude: { type: Number },
            longitude: { type: Number }, 
         },
    distance: { type: String }, 
    truckAssigned: { 
        type: mongoose.Types.ObjectId,
        ref: "Truck",
        required: true, 
    },   
});

export default model<IRoute>('Route', routeSchema);
