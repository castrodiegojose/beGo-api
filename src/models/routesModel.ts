import { Schema, model, Document } from "mongoose";

export interface ICoordenates {
    latitude: number;
    longitude: number;
}

export interface IRouteDirections {
    from: ICoordenates;
    to: ICoordenates;
    distance: string;

}

export interface IRoute extends Document {
    pointA: string;
    pointB: string;
    route: IRouteDirections;
};


const routeSchema = new Schema({
    pointA: { type: String },
    pointB: { type: String },
    route: { 
        from: { 
            latitude: { type: Number },
            longitude: { type: Number }, 
        },
        to:{ 
            latitude: { type: Number },
            longitude: { type: Number }, 
         },
        distance: { type: String },
    }
});

export default model<IRoute>('Route', routeSchema);
