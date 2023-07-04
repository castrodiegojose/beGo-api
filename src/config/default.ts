import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGO_URI,
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY
}

export default config;