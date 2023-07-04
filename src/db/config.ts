import mongoose, {ConnectOptions} from "mongoose";
import config from "../config/default";

const MONGO_URI = `mongodb://${config.MONGODB_URI}`;

const connectDB = async(): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions);
        console.log("MongoDB Connected");

    }catch (e) {
        console.error(`Failed to connect MongoDB ${e}`);
    }
}

export default connectDB;