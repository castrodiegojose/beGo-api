import { Schema, model, Document } from "mongoose";

export interface ITruck {
    model: string;
    make: string;
    year: number;
    color: string;
    transportWeight: number;
    created_at: number;
};


const trucksSchema = new Schema({
    model: { type: String },
    make: { type: String },
    year: { type: Number },
    color: { type: String },
    transportWeight: { type: Number },
    created_at: { type: Number },
});

export default model<ITruck>('Truck', trucksSchema);
