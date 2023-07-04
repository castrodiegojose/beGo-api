import express, {Application} from "express"; 
import bodyparser from "body-parser";
import connectDB from "./db/config";
import config from "./config/default";
import authRoutes from './routes/authRoutes'

// connecting mongoDB
connectDB();
const app: Application = express();

// middleware
app.use(bodyparser.json());

//routes
app.use('/api/auth', authRoutes);

// server
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT} 🚀`)
})