import { Schema, model, Document } from "mongoose";

export interface ILocation {
    name: string;
    placeId: string;
}

export interface IPoint extends Document{
    location: ILocation,
}

const pointsSchema = new Schema({
    location: {
        name: { type: String },
        locationId: { type: String },
    }
});

export default model<IPoint>('Point', pointsSchema)


